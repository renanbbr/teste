import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Loader2, MapPin, Copy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PLANS = {
  pro: { name: "PRO", price: 29, period: "mês", description: "Plano básico com acesso a produtos por preço de custo" },
  tech: { name: "TECH", price: 49, period: "mês", description: "Plano intermediário com mais benefícios" },
  ultra: { name: "ULTRA", price: 79, period: "mês", description: "Plano completo com todos os benefícios" }
};

// URL DO BACKEND - Confirme se a porta é 3001
const API_URL = "http://localhost:3001/api";

const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || "TEST-b61e523a-6703-4703-ab01-10914216d28f";
initMercadoPago(MP_PUBLIC_KEY, { locale: "pt-BR" });

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
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Estados do PIX
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState<string | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState<string | null>(null);
  const [isPixLoading, setIsPixLoading] = useState(false);
  
  // Estados de Erro
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const lastSearchedCep = useRef<string>("");

  useEffect(() => {
    if (!selectedPlan) navigate("/#pricing");
  }, [selectedPlan, navigate]);

  // Validação do Formulário
  useEffect(() => {
    const requiredFields = [
      customerData.name, customerData.email, customerData.phone, customerData.cpf,
      customerData.zipCode, customerData.street, customerData.number, 
      customerData.neighborhood, customerData.city, customerData.state
    ];
    setIsFormValid(requiredFields.every(field => field && field.trim() !== ""));
  }, [customerData]);

  // Resetar estados ao mudar método
  useEffect(() => {
    setErrorMessage(null);
    if (paymentMethod !== "pix") {
      setPixQrCodeBase64(null);
      setPixCopyPaste(null);
    }
  }, [paymentMethod]);

  // --- COLE ISSO AQUI (Antes do handleInputChange) ---

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após o 3º digito
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após o 6º digito
      .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Coloca traço após o 9º digito
      .replace(/(-\d{2})\d+?$/, "$1"); // Limita tamanho
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Coloca hífen depois do 5º dígito
      .replace(/(-\d{4})\d+?$/, "$1"); // Limita tamanho
  };

  // ---------------------------------------------------

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8 || cleanCep === lastSearchedCep.current) return;
    
    lastSearchedCep.current = cleanCep;
    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setCustomerData(prev => ({
          ...prev,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        }));
        toast({ title: "Endereço encontrado!" });
      }
    } catch (e) { console.error(e); } 
    finally { setIsLoadingCep(false); }
  };

  const handleCardPayment = async (formData: any) => {
    if (!selectedPlan) return;
    setErrorMessage(null);

    const payload = {
        ...formData,
        payer: {
            email: customerData.email,
            identification: { type: "CPF", number: customerData.cpf.replace(/\D/g, "") },
            first_name: customerData.name.split(" ")[0],
            last_name: customerData.name.split(" ").slice(1).join(" ") || "Cliente"
        },
        description: `Assinatura ${selectedPlan.name}`
    };

    return new Promise<void>((resolve, reject) => {
      fetch(`${API_URL}/card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.details || "Erro no pagamento");
        toast({ title: "Pagamento Aprovado!", className: "bg-green-600 text-white" });
        navigate("/checkout/success");
        resolve();
      })
      .catch(error => {
        setErrorMessage(error.message);
        reject();
      });
    });
  };

  const handlePixPayment = async () => {
    if (!selectedPlan) return;
    setIsPixLoading(true);
    setErrorMessage(null);

    try {
        const payload = {
            title: `Assinatura ${selectedPlan.name}`,
            price: selectedPlan.price,
            email: customerData.email,
            identification: { type: "CPF", number: customerData.cpf.replace(/\D/g, "") }
        };

        const res = await fetch(`${API_URL}/pix`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Falha ao gerar PIX");

        setPixQrCodeBase64(data.qr_code_base64);
        setPixCopyPaste(data.qr_code);
        toast({ title: "QR Code gerado com sucesso!" });

    } catch (error: any) {
        setErrorMessage(error.message);
    } finally {
        setIsPixLoading(false);
    }
  };

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      <div className="container px-4 pt-32 pb-20 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" onClick={() => navigate("/#pricing")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {/* DADOS PESSOAIS */}
              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                      {/* ... Nome e Email continuam iguais ... */}
                      <div className="space-y-2">
                          <Label>Nome completo *</Label>
                          <Input value={customerData.name} onChange={e => handleInputChange("name", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input value={customerData.email} onChange={e => handleInputChange("email", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                      </div>

                      {/* --- SUBSTITUA O INPUT DO CPF AQUI --- */}
                      <div className="space-y-2">
                          <Label>CPF *</Label>
                          <Input 
                            value={customerData.cpf} 
                            // A MÁGICA ACONTECE AQUI:
                            onChange={e => handleInputChange("cpf", formatCPF(e.target.value))} 
                            maxLength={14} 
                            className="bg-[#1A1A1A] border-white/10" 
                            placeholder="000.000.000-00"
                          />
                      </div>

                      {/* --- SUBSTITUA O INPUT DO TELEFONE AQUI --- */}
                      <div className="space-y-2">
                          <Label>Telefone *</Label>
                          <Input 
                            value={customerData.phone} 
                            // E AQUI TAMBÉM:
                            onChange={e => handleInputChange("phone", formatPhone(e.target.value))} 
                            maxLength={15} 
                            className="bg-[#1A1A1A] border-white/10" 
                            placeholder="(00) 90000-0000"
                          />
                      </div>
                  </CardContent>
              </Card>

              {/* ENDEREÇO (TODOS OS CAMPOS) */}
              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader><CardTitle>Endereço</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                              <Label>CEP *</Label>
                              <div className="relative">
                                  <Input value={customerData.zipCode} onChange={e => {
                                      handleInputChange("zipCode", e.target.value);
                                      if(e.target.value.replace(/\D/g, "").length === 8) fetchAddressByCep(e.target.value);
                                  }} className="bg-[#1A1A1A] border-white/10" maxLength={9}/>
                                  {isLoadingCep && <Loader2 className="absolute right-3 top-3 w-4 h-4 animate-spin"/>}
                              </div>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                              <Label>Rua *</Label>
                              <Input value={customerData.street} onChange={e => handleInputChange("street", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                          </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                              <Label>Número *</Label>
                              <Input value={customerData.number} onChange={e => handleInputChange("number", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                              <Label>Complemento</Label>
                              <Input value={customerData.complement} onChange={e => handleInputChange("complement", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                          </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                          <div className="md:col-span-2 space-y-2">
                              <Label>Bairro *</Label>
                              <Input value={customerData.neighborhood} onChange={e => handleInputChange("neighborhood", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                          </div>
                          <div className="space-y-2">
                              <Label>UF *</Label>
                              <Input value={customerData.state} onChange={e => handleInputChange("state", e.target.value.toUpperCase())} maxLength={2} className="bg-[#1A1A1A] border-white/10" />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <Label>Cidade *</Label>
                          <Input value={customerData.city} onChange={e => handleInputChange("city", e.target.value)} className="bg-[#1A1A1A] border-white/10" />
                      </div>
                  </CardContent>
              </Card>

              {/* PAGAMENTO */}
              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader><CardTitle>Pagamento</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setPaymentMethod("card")} className={`p-4 rounded border-2 ${paymentMethod === "card" ? "border-primary bg-primary/10" : "border-white/10"}`}>Cartão</button>
                        <button onClick={() => setPaymentMethod("pix")} className={`p-4 rounded border-2 ${paymentMethod === "pix" ? "border-primary bg-primary/10" : "border-white/10"}`}>PIX</button>
                      </div>

                      {/* Exibição de Erros */}
                      {errorMessage && (
                          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded flex items-center gap-2 text-red-200">
                              <AlertCircle className="w-5 h-5" />
                              <span>{errorMessage}</span>
                          </div>
                      )}

                      {/* Conteúdo Cartão */}
                      {paymentMethod === "card" && (
                          <div className="bg-white p-4 rounded">
                              {isFormValid ? (
                                  <CardPayment 
                                      initialization={{ amount: selectedPlan.price }} 
                                      onSubmit={handleCardPayment}
                                      customization={{ visual: { style: { theme: 'default' } } }}
                                  />
                              ) : (
                                  <p className="text-black text-center">Preencha todos os dados acima para liberar o cartão.</p>
                              )}
                          </div>
                      )}

                      {/* Conteúdo PIX */}
                      {paymentMethod === "pix" && (
                          <div className="space-y-4">
                              {!isFormValid ? (
                                  <p className="text-muted-foreground">Preencha os dados acima para gerar o PIX.</p>
                              ) : !pixQrCodeBase64 ? (
                                  <Button onClick={handlePixPayment} disabled={isPixLoading} className="w-full button-gradient">
                                      {isPixLoading ? <Loader2 className="animate-spin mr-2"/> : "Gerar QR Code PIX"}
                                  </Button>
                              ) : (
                                  <div className="text-center space-y-4">
                                      <img src={`data:image/png;base64,${pixQrCodeBase64}`} alt="QR Code" className="mx-auto w-48 rounded bg-white"/>
                                      <div className="flex gap-2">
                                          <Input readOnly value={pixCopyPaste || ""} className="bg-black font-mono text-xs"/>
                                          <Button size="icon" onClick={() => {navigator.clipboard.writeText(pixCopyPaste!); toast({title: "Copiado!"})}}><Copy className="w-4"/></Button>
                                      </div>
                                  </div>
                              )}
                          </div>
                      )}
                  </CardContent>
              </Card>
            </div>

            {/* RESUMO (COLUNA DIREITA) */}
            <div className="lg:col-span-1">
                <Card className="bg-[#0A0A0A] border-white/10 sticky top-24">
                    <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>R$ {selectedPlan.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{selectedPlan.name}</p>
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