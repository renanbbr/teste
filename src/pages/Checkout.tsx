import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Configuração dos planos
const PLANS = {
  pro: {
    name: "PRO",
    price: 29,
    period: "mês",
    description: "Plano básico com acesso a produtos por preço de custo"
  },
  tech: {
    name: "TECH",
    price: 49,
    period: "mês",
    description: "Plano intermediário com mais benefícios"
  },
  ultra: {
    name: "ULTRA",
    price: 79,
    period: "mês",
    description: "Plano completo com todos os benefícios"
  }
};

// Credenciais do Mercado Pago
const MERCADOPAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || "TEST-b61e523a-6703-4703-ab01-10914216d28f";
// ⚠️ AVISO: Em produção, o Access Token DEVE estar apenas no backend por questões de segurança
// Está aqui apenas para facilitar testes. Para produção, crie um backend que processe os pagamentos.
const MERCADOPAGO_ACCESS_TOKEN = import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN || "TEST-4295884433119470-120811-740f66532219cdd15d5b8debc812da5d-729938060";

// Inicializar Mercado Pago
initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { locale: "pt-BR" });

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planKey = searchParams.get("plan") as keyof typeof PLANS;
  const selectedPlan = planKey && PLANS[planKey] ? PLANS[planKey] : null;

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentPreferenceId, setPaymentPreferenceId] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const lastSearchedCep = useRef<string>("");

  // Redirecionar se não houver plano válido
  useEffect(() => {
    if (!selectedPlan) {
      navigate("/#pricing");
    }
  }, [selectedPlan, navigate]);

  // Validar formulário
  useEffect(() => {
    const requiredFields = [
      customerData.name,
      customerData.email,
      customerData.phone,
      customerData.cpf,
      customerData.zipCode,
      customerData.street,
      customerData.number,
      customerData.neighborhood,
      customerData.city,
      customerData.state
    ];
    setIsFormValid(requiredFields.every(field => field.trim() !== ""));
  }, [customerData]);

  // Criar preferência de pagamento
  const createPaymentPreference = useCallback(async () => {
    if (!selectedPlan || !isFormValid) return null;

    try {
      const preferenceData = {
        items: [
          {
            title: `Assinatura ${selectedPlan.name} - SealClub`,
            description: selectedPlan.description,
            quantity: 1,
            unit_price: selectedPlan.price,
            currency_id: "BRL"
          }
        ],
        payer: {
          name: customerData.name,
          email: customerData.email,
          phone: {
            number: customerData.phone.replace(/\D/g, "")
          },
          identification: {
            type: "CPF",
            number: customerData.cpf.replace(/\D/g, "")
          },
          address: {
            zip_code: customerData.zipCode.replace(/\D/g, ""),
            street_name: customerData.street,
            street_number: parseInt(customerData.number) || 0,
            neighborhood: customerData.neighborhood,
            city: customerData.city,
            federal_unit: customerData.state
          }
        },
        back_urls: {
          success: `${window.location.origin}/checkout/success`,
          failure: `${window.location.origin}/checkout?plan=${planKey}&error=true`,
          pending: `${window.location.origin}/checkout?plan=${planKey}&pending=true`
        },
        // auto_return só funciona para pagamentos aprovados automaticamente (não para PIX)
        ...(paymentMethod === "card" ? { auto_return: "approved" as const } : {}),
        payment_methods: {
          excluded_payment_types: paymentMethod === "pix" ? [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "ticket" }
          ] : [],
          excluded_payment_methods: paymentMethod === "card" ? [
            { id: "pix" }
          ] : []
        },
        statement_descriptor: "SEALCLUB",
        notification_url: `${window.location.origin}/api/webhook`,
        external_reference: `plan_${planKey}_${Date.now()}`
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`
        },
        body: JSON.stringify(preferenceData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao criar preferência de pagamento");
      }

      const preference = await response.json();
      return preference.id;
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive"
      });
      return null;
    }
  }, [selectedPlan, customerData, paymentMethod, planKey, isFormValid, toast]);

  if (!selectedPlan) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return value;
  };

  // Buscar CEP na API ViaCEP
  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    
    // Só busca se tiver 8 dígitos e não for o mesmo CEP já buscado
    if (cleanCep.length !== 8 || cleanCep === lastSearchedCep.current) {
      return;
    }

    lastSearchedCep.current = cleanCep;
    setIsLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Por favor, verifique o CEP digitado ou preencha o endereço manualmente.",
          variant: "destructive"
        });
        setIsLoadingCep(false);
        return;
      }

      // Preencher campos automaticamente
      setCustomerData(prev => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        complement: prev.complement || "" // Mantém o complemento se já estiver preenchido
      }));

      toast({
        title: "Endereço encontrado!",
        description: "Os campos foram preenchidos automaticamente. Verifique se está tudo correto.",
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar o endereço. Por favor, preencha manualmente.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  // Handler para CEP com busca automática
  const handleZipCodeChange = (value: string) => {
    const formatted = formatZipCode(value);
    handleInputChange("zipCode", formatted);
    
    // Busca automaticamente quando o CEP estiver completo (8 dígitos)
    const cleanCep = value.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      fetchAddressByCep(cleanCep);
    }
  };



  // Criar preferência PIX automaticamente quando formulário estiver válido
  useEffect(() => {
    if (paymentMethod === "pix" && isFormValid && !paymentPreferenceId && selectedPlan) {
      createPaymentPreference().then(id => {
        if (id) {
          setPaymentPreferenceId(id);
        }
      });
    } else if (paymentMethod === "card") {
      // Limpar preferência quando mudar para cartão
      setPaymentPreferenceId(null);
    }
  }, [paymentMethod, isFormValid, paymentPreferenceId, selectedPlan, createPaymentPreference]);

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      <div className="container px-4 pt-32 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Botão voltar */}
          <Button
            variant="ghost"
            onClick={() => navigate("/#pricing")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para planos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna esquerda - Formulário */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Finalize sua assinatura
                </h1>
                <p className="text-muted-foreground">
                  Preencha seus dados para concluir o pagamento
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Dados Pessoais */}
                <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Dados Pessoais</CardTitle>
                    <CardDescription>
                      Informações necessárias para processar sua assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={customerData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Seu nome completo"
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          value={customerData.cpf}
                          onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                          placeholder="000.000.000-00"
                          maxLength={14}
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={customerData.phone}
                          onChange={(e) => handleInputChange("phone", formatPhone(e.target.value))}
                          placeholder="(00) 00000-0000"
                          maxLength={15}
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Endereço */}
                <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Endereço</CardTitle>
                    <CardDescription>
                      Informações de cobrança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          CEP *
                          {isLoadingCep && (
                            <Loader2 className="w-3 h-3 animate-spin text-primary" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="zipCode"
                            value={customerData.zipCode}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            placeholder="00000-000"
                            maxLength={9}
                            required
                            disabled={isLoadingCep}
                            className="bg-[#1A1A1A] border-white/10 pr-10"
                          />
                          {isLoadingCep && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Digite o CEP para buscar o endereço automaticamente
                        </p>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                          id="street"
                          value={customerData.street}
                          onChange={(e) => handleInputChange("street", e.target.value)}
                          placeholder="Nome da rua"
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={customerData.number}
                          onChange={(e) => handleInputChange("number", e.target.value)}
                          placeholder="123"
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={customerData.complement}
                          onChange={(e) => handleInputChange("complement", e.target.value)}
                          placeholder="Apto, bloco, etc."
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={customerData.neighborhood}
                          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                          placeholder="Nome do bairro"
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">UF *</Label>
                        <Input
                          id="state"
                          value={customerData.state}
                          onChange={(e) => handleInputChange("state", e.target.value.toUpperCase())}
                          placeholder="RS"
                          maxLength={2}
                          required
                          className="bg-[#1A1A1A] border-white/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={customerData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Nome da cidade"
                        required
                        className="bg-[#1A1A1A] border-white/10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Método de Pagamento */}
                <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Método de Pagamento
                    </CardTitle>
                    <CardDescription>
                      Escolha como deseja pagar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium mb-1">Cartão de Crédito</div>
                          <div className="text-sm text-muted-foreground">
                            Visa, Mastercard, Elo
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pix")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === "pix"
                            ? "border-primary bg-primary/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium mb-1">PIX</div>
                          <div className="text-sm text-muted-foreground">
                            Pagamento instantâneo
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Integração Mercado Pago - Cartão */}
                    {paymentMethod === "card" && isFormValid && selectedPlan && (
                      <div className="mt-4 space-y-4">
                        <div className="p-4 bg-[#1A1A1A] rounded-lg border border-white/10">
                          <p className="text-sm text-muted-foreground mb-4">
                            Preencha os dados do cartão para finalizar o pagamento
                          </p>
                          
                          <div id="cardPaymentForm" className="space-y-4">
                            {/* Os campos serão preenchidos via API do Mercado Pago após criar preferência */}
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <p className="text-sm text-foreground font-medium mb-2">
                                💳 Pagamento com Cartão
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Após preencher os dados acima, clique no botão abaixo para processar o pagamento.
                                O formulário de cartão será carregado automaticamente.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && !isFormValid && (
                      <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg border border-white/10">
                        <p className="text-sm text-muted-foreground">
                          Preencha todos os dados acima para continuar com o pagamento por cartão.
                        </p>
                      </div>
                    )}

                    {/* Integração Mercado Pago - PIX */}
                    {paymentMethod === "pix" && selectedPlan && (
                      <div className="mt-4">
                        {paymentPreferenceId ? (
                          <div className="p-4 bg-[#1A1A1A] rounded-lg border border-white/10 space-y-4">
                            <div className="text-center">
                              <p className="text-sm font-medium text-foreground mb-2">
                                ✅ Preferência de pagamento criada!
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">
                                Para completar o pagamento PIX, você será redirecionado para a página do Mercado Pago.
                              </p>
                              <Button
                                type="button"
                                onClick={() => {
                                  window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${paymentPreferenceId}`;
                                }}
                                className="button-gradient w-full"
                              >
                                Pagar com PIX - R$ {selectedPlan.price.toFixed(2)}
                              </Button>
                            </div>
                          </div>
                        ) : isFormValid ? (
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              <p className="text-sm text-foreground font-medium">
                                Gerando código PIX...
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Aguarde enquanto preparamos seu QR Code de pagamento.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-[#1A1A1A] rounded-lg border border-white/10">
                            <p className="text-sm text-muted-foreground">
                              Preencha todos os dados acima para gerar o código PIX.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === "pix" && !isFormValid && (
                      <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg border border-white/10">
                        <p className="text-sm text-muted-foreground">
                          Preencha todos os dados acima para gerar o código PIX.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {paymentMethod === "card" && isFormValid && (
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!isFormValid) {
                        toast({
                          title: "Formulário incompleto",
                          description: "Por favor, preencha todos os campos obrigatórios.",
                          variant: "destructive"
                        });
                        return;
                      }
                      
                      setIsProcessing(true);
                      const preferenceId = await createPaymentPreference();
                      
                      if (preferenceId) {
                        // Redirecionar para checkout do Mercado Pago
                        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
                      } else {
                        setIsProcessing(false);
                      }
                    }}
                    disabled={isProcessing}
                    className="button-gradient w-full py-6 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      `Finalizar pagamento - R$ ${selectedPlan.price.toFixed(2)}`
                    )}
                  </Button>
                )}

              </form>
            </div>

            {/* Coluna direita - Resumo */}
            <div className="lg:col-span-1">
              <Card className="bg-[#0A0A0A] border-white/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo da Assinatura</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Plano</span>
                      <span className="font-semibold">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valor</span>
                      <span className="text-2xl font-bold">
                        R$ {selectedPlan.price}
                        <span className="text-base text-muted-foreground font-normal">/{selectedPlan.period}</span>
                      </span>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedPlan.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Pagamento seguro</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Cancelamento a qualquer momento</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Acesso imediato após confirmação</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;

