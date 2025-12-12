import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Loader2, Copy, AlertCircle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PLANS = {
  pro: { name: "PRO", price: 0.5, period: "único", description: "Plano básico com acesso a produtos por preço de custo (12 meses)" },
  tech: { name: "TECH", price: 588, period: "único", description: "Plano intermediário com mais benefícios (12 meses)" },
  ultra: { name: "ULTRA", price: 948, period: "único", description: "Plano completo com todos os benefícios (12 meses)" }
};

// Usar variável de ambiente com fallback para desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || "TEST-a558b17c-1cec-45c6-8990-99b1dda73bbc";
initMercadoPago(MP_PUBLIC_KEY, { locale: "pt-BR" });

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planKey = searchParams.get("plan") as keyof typeof PLANS;
  const selectedPlan = planKey && PLANS[planKey] ? PLANS[planKey] : null;

  // 1. ESTADO LIMPO
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Estados do PIX
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState<string | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState<string | null>(null);
  const [isPixLoading, setIsPixLoading] = useState(false);
  
  // --- CORREÇÃO 1: O useState deve ficar AQUI DENTRO ---
  const [paymentId, setPaymentId] = useState<number | null>(null);

  // Estados do Cupom
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); 
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPlan) navigate("/#pricing");
  }, [selectedPlan, navigate]);

  // Validação
  useEffect(() => {
    const requiredFields = [
      customerData.name, 
      customerData.email, 
      customerData.phone, 
      customerData.cpf
    ];
    setIsFormValid(requiredFields.every(field => field && field.trim() !== ""));
  }, [customerData]);

  useEffect(() => {
    setErrorMessage(null);
    if (paymentMethod !== "pix") {
      setPixQrCodeBase64(null);
      setPixCopyPaste(null);
      setPaymentId(null); // Limpa ID se trocar de aba
    }
  }, [paymentMethod]);

  // --- CORREÇÃO 2: O "Espião" (Polling) ---
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Se tem ID de pagamento e estamos na aba PIX, começa a verificar
    if (paymentMethod === "pix" && paymentId && !isPixLoading) {
        interval = setInterval(async () => {
            try {
                const res = await fetch(`${API_URL}/payment/${paymentId}`);
                const data = await res.json();
                
                if (data.status === "approved") {
                    clearInterval(interval);
                    toast({ title: "Pagamento confirmado!", className: "bg-green-600 text-white" });
                    navigate("/checkout/success");
                }
            } catch (error) {
                console.error("Aguardando confirmação...");
            }
        }, 3000); // Verifica a cada 3 segundos
    }

    return () => clearInterval(interval);
  }, [paymentMethod, paymentId, isPixLoading, navigate, toast]);


  // Formatações
  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  // Cupom
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SEAL10") {
        const discountValue = selectedPlan ? selectedPlan.price * 0.10 : 0; 
        setDiscount(discountValue);
        setIsCouponApplied(true);
        toast({ title: "Cupom aplicado!", description: "Desconto de 10% concedido." });
    } else {
        setDiscount(0);
        setIsCouponApplied(false);
        toast({ title: "Cupom inválido", variant: "destructive" });
    }
  };

  const finalPrice = selectedPlan ? (selectedPlan.price - discount) : 0;

  // Processamento Cartão
  const handleCardPayment = async (formData: any) => {
    if (!selectedPlan) return;
    setErrorMessage(null);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const payload = {
          transaction_amount: finalPrice,
          token: formData.token,
          description: `Pagamento ${selectedPlan.name}`,
          installments: formData.installments,
          payment_method_id: formData.payment_method_id,
          issuer_id: formData.issuer_id,
          payer: {
            email: customerData.email,
            first_name: customerData.name.split(" ")[0],
            last_name: customerData.name.split(" ").slice(1).join(" ") || "Cliente",
            identification: {
              type: "CPF",
              number: customerData.cpf.replace(/\D/g, "")
            }
          },
          name: customerData.name,
          plan_name: selectedPlan.name
        };

        const res = await fetch(`${API_URL}/card`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Erro no pagamento");

        toast({ title: "Pagamento aprovado!", className: "bg-green-600 text-white" });
        navigate("/checkout/success");
        resolve();
      } catch (error: any) {
        setErrorMessage(error.message || "Erro ao processar pagamento");
        reject();
      }
    });
  };

  // Processamento PIX
  const handlePixPayment = async () => {
    if (!selectedPlan) return;
    setIsPixLoading(true);
    setErrorMessage(null);

    try {
        const payload = {
            title: `Pagamento ${selectedPlan.name}`,
            price: finalPrice, 
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
        
        // --- CORREÇÃO 3: Salvar o ID aqui para o polling monitorar ---
        setPaymentId(data.id);
        
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
              
              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader>
                    <CardTitle>Dados Pessoais</CardTitle>
                    <CardDescription>Informe seus dados para contato e nota fiscal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label>Nome Completo / Razão Social *</Label>
                              <Input 
                                value={customerData.name} 
                                onChange={e => handleInputChange("name", e.target.value)} 
                                className="bg-[#1A1A1A] border-white/10 h-11" 
                                placeholder="Nome completo"
                              />
                          </div>
                          <div className="space-y-2">
                              <Label>E-mail *</Label>
                              <Input 
                                value={customerData.email} 
                                onChange={e => handleInputChange("email", e.target.value)} 
                                className="bg-[#1A1A1A] border-white/10 h-11" 
                                placeholder="seu@email.com"
                              />
                          </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label>Celular com DDD *</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🇧🇷 +55</span>
                                <Input 
                                    value={customerData.phone} 
                                    onChange={e => handleInputChange("phone", formatPhone(e.target.value))} 
                                    maxLength={15} 
                                    className="bg-[#1A1A1A] border-white/10 pl-20 h-11" 
                                    placeholder="(00) 00000-0000"
                                />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label>CPF/CNPJ *</Label>
                              <Input 
                                value={customerData.cpf} 
                                onChange={e => handleInputChange("cpf", formatCPF(e.target.value))} 
                                maxLength={14} 
                                className="bg-[#1A1A1A] border-white/10 h-11" 
                                placeholder="000.000.000-00"
                              />
                          </div>
                      </div>
                  </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-2">
                        <Label className="flex items-center gap-2 text-primary font-medium">
                            <Tag className="w-4 h-4" /> Tem cupom de desconto?
                        </Label>
                        <div className="flex gap-2">
                            <Input 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Insira o código" 
                                className="bg-[#1A1A1A] border-white/10 h-11 uppercase"
                                disabled={isCouponApplied}
                            />
                            <Button 
                                onClick={handleApplyCoupon}
                                disabled={isCouponApplied || !couponCode}
                                className="h-11 px-8 bg-white text-black hover:bg-gray-200"
                            >
                                {isCouponApplied ? "Aplicado" : "Aplicar"}
                            </Button>
                        </div>
                        {isCouponApplied && (
                            <p className="text-sm text-green-500 mt-1">
                                Desconto de R$ {discount.toFixed(2).replace('.', ',')} aplicado com sucesso!
                            </p>
                        )}
                    </div>
                  </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-white/10">
                  <CardHeader><CardTitle>Pagamento</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setPaymentMethod("card")} className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "card" ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/20"}`}>Cartão</button>
                        <button onClick={() => setPaymentMethod("pix")} className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "pix" ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/20"}`}>PIX</button>
                      </div>

                      {errorMessage && (
                          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded flex items-center gap-2 text-red-200">
                              <AlertCircle className="w-5 h-5" />
                              <span>{errorMessage}</span>
                          </div>
                      )}

                      {paymentMethod === "card" && (
                          <div className="bg-white p-4 rounded-lg">
                              {isFormValid ? (
                                  <CardPayment 
                                      initialization={{ amount: finalPrice }} 
                                      onSubmit={handleCardPayment}
                                      customization={{ visual: { style: { theme: 'default' } } }}
                                  />
                              ) : (
                                  <p className="text-black text-center text-sm">Preencha seus dados pessoais acima para liberar o cartão.</p>
                              )}
                          </div>
                      )}

                      {paymentMethod === "pix" && (
                          <div className="space-y-4">
                              {!isFormValid ? (
                                  <p className="text-muted-foreground text-sm">Preencha seus dados acima para gerar o PIX.</p>
                              ) : !pixCopyPaste ? (
                                  <Button onClick={handlePixPayment} disabled={isPixLoading} className="w-full button-gradient h-12 text-lg">
                                      {isPixLoading ? <Loader2 className="animate-spin mr-2"/> : `Pagar R$ ${finalPrice.toFixed(2).replace('.', ',')}`}
                                  </Button>
                              ) : (
                                  <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                      <div className="p-4 bg-white rounded-lg inline-block">
                                        {pixQrCodeBase64 ? (
                                            <img src={`data:image/png;base64,${pixQrCodeBase64}`} alt="QR Code" className="w-48 h-48"/>
                                        ) : (
                                            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-500 text-xs p-4 border-2 border-dashed border-gray-300">
                                                Imagem indisponível<br/>Use o código abaixo
                                            </div>
                                        )}
                                      </div>
                                      
                                      <div className="space-y-2">
                                          <Label className="text-xs text-muted-foreground">Código Copia e Cola</Label>
                                          <div className="flex gap-2">
                                              <Input readOnly value={pixCopyPaste || ""} className="bg-[#1A1A1A] border-white/10 font-mono text-xs h-10"/>
                                              <Button size="icon" variant="outline" onClick={() => {navigator.clipboard.writeText(pixCopyPaste!); toast({title: "Copiado!"})}}>
                                                  <Copy className="w-4 h-4"/>
                                              </Button>
                                          </div>
                                      </div>
                                      
                                      <div className="flex items-center justify-center text-green-500 text-sm font-medium gap-2">
                                          <Check className="w-4 h-4" />
                                          <span>Aguardando pagamento...</span>
                                      </div>
                                  </div>
                              )}
                          </div>
                      )}
                  </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
                <Card className="bg-[#0A0A0A] border-white/10 sticky top-24">
                    <CardHeader><CardTitle>Resumo do Pedido</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Plano {selectedPlan.name}</span>
                            <div className="text-right">
                                <div className="text-sm">
                                    12x de R$ {(selectedPlan.price / 12).toFixed(2).replace('.', ',')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    ou à vista de R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
                                </div>
                            </div>
                        </div>
                        
                        {isCouponApplied && (
                            <div className="flex justify-between text-sm text-green-500">
                                <span>Desconto (Cupom)</span>
                                <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                            </div>
                        )}

                        <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
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