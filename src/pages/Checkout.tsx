import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Lock, Loader2, Copy, AlertCircle, Tag, ShieldCheck, CreditCard, QrCode, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PLANS = {
  pro: { name: "PRO", price: 348, period: "único", description: "Plano básico" },
  tech: { name: "TECH", price: 588, period: "único", description: "Plano intermediário" },
  ultra: { name: "ULTRA", price: 948, period: "único", description: "Plano completo" }
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || "TEST-a558b17c-1cec-45c6-8990-99b1dda73bbc";

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
    cpf: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [isContactValid, setIsContactValid] = useState(false);

  // PIX
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState<string | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState<string | null>(null);
  const [isPixLoading, setIsPixLoading] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  // Cupom
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selectedPlan) navigate("/#pricing");
  }, [selectedPlan, navigate]);

  // --- VALIDAÇÃO DINÂMICA ---
  useEffect(() => {
    const hasNameAndPhone =
      customerData.name.trim().length > 3 &&
      customerData.phone.length >= 14;

    if (paymentMethod === "pix") {
      const hasEmail = customerData.email.includes("@");
      const hasCPF = customerData.cpf.length >= 14;
      setIsContactValid(hasNameAndPhone && hasEmail && hasCPF);
    } else {
      setIsContactValid(hasNameAndPhone);
    }
  }, [customerData, paymentMethod]);

  useEffect(() => {
    setErrorMessage(null);
    if (paymentMethod !== "pix") {
      setPixQrCodeBase64(null);
      setPixCopyPaste(null);
      setPaymentId(null);
    }
  }, [paymentMethod]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
        } catch (error) { console.error("Aguardando..."); }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [paymentMethod, paymentId, isPixLoading, navigate, toast]);

  const formatCPF = (value: string) => value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
  const formatPhone = (value: string) => value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})\d+?$/, "$1");

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SEAL10") {
      setDiscount((selectedPlan?.price || 0) * 0.10);
      setIsCouponApplied(true);
      toast({ title: "Cupom aplicado!", description: "Desconto de 10% concedido." });
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
      toast({ title: "Cupom inválido", variant: "destructive" });
    }
  };

  const finalPrice = selectedPlan ? (selectedPlan.price - discount) : 0;

  const handleCardPayment = async (formData: any) => {
    if (!selectedPlan) return;

    if (!isContactValid) {
      toast({
        title: "Faltam dados pessoais",
        description: "Por favor, preencha seu nome e telefone acima.",
        variant: "destructive",
        duration: 5000
      });
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setErrorMessage(null);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const payerCpf = formData.payer?.identification?.number || customerData.cpf.replace(/\D/g, "");
        const payerEmail = formData.payer?.email || customerData.email;

        // payload ajustado para salvar no banco corretamente
        const payload = {
          transaction_amount: finalPrice,
          token: formData.token,
          description: `Pagamento ${selectedPlan.name}`,
          installments: formData.installments,
          payment_method_id: formData.payment_method_id,
          issuer_id: formData.issuer_id,
          payer: {
            email: payerEmail,
            first_name: customerData.name.split(" ")[0],
            last_name: customerData.name.split(" ").slice(1).join(" ") || "Cliente",
            identification: { type: "CPF", number: payerCpf }
          },
          // Campos Extras para o Supabase
          product_name: `Pagamento ${selectedPlan.name}`,
          name_customer: customerData.name,
          phone_customer: customerData.phone
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

  const handlePixPayment = async () => {
    if (!selectedPlan) return;
    setIsPixLoading(true);
    setErrorMessage(null);

    try {
      // payload corrigido para o backend aceitar o CPF
      const payload = {
        product_name: `Pagamento ${selectedPlan.name}`,
        price: finalPrice,
        email: customerData.email,
        cpf: customerData.cpf.replace(/\D/g, ""), // Envia o CPF limpo (só números)
        name_customer: customerData.name,
        phone_customer: customerData.phone
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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 font-sans relative">

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-black pointer-events-none"
      />

      <div className="container px-4 pt-8 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button variant="ghost" onClick={() => navigate("/#pricing")} className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

              {/* ETAPA 1: ESCOLHA DO MÉTODO */}
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-3 px-6">
                  <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                    <Wallet className="w-4 h-4 text-indigo-600" /> 1. Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-4 px-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border flex items-center justify-center gap-3 transition-all duration-200 group ${paymentMethod === "card"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm ring-1 ring-indigo-500"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      <CreditCard className={`w-5 h-5 transition-colors ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className="font-semibold text-sm">Cartão de Crédito</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-3 rounded-lg border flex items-center justify-center gap-3 transition-all duration-200 group ${paymentMethod === "pix"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm ring-1 ring-emerald-500"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      <QrCode className={`w-5 h-5 transition-colors ${paymentMethod === 'pix' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className="font-semibold text-sm">PIX</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* ETAPA 2: DADOS PESSOAIS */}
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden transition-all">
                <CardHeader className="bg-white border-b border-slate-100 py-3 px-6">
                  <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 2. Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 pb-6 px-6">

                  {/* Linha 1: Nome e Telefone (Sempre visíveis) */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 font-medium text-xs uppercase">Nome Completo *</Label>
                      <Input
                        value={customerData.name}
                        onChange={e => handleInputChange("name", e.target.value)}
                        className="bg-white border-slate-300 text-slate-900 h-10"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 font-medium text-xs uppercase">Celular (WhatsApp) *</Label>
                      <Input
                        value={customerData.phone}
                        onChange={e => handleInputChange("phone", formatPhone(e.target.value))}
                        maxLength={15}
                        className="bg-white border-slate-300 text-slate-900 h-10"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  {/* Linha 2: E-mail e CPF (Apenas PIX) */}
                  <AnimatePresence>
                    {paymentMethod === "pix" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid md:grid-cols-2 gap-4 overflow-hidden"
                      >
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-medium text-xs uppercase">E-mail *</Label>
                          <Input
                            value={customerData.email}
                            type="email"
                            onChange={e => handleInputChange("email", e.target.value)}
                            className="bg-white border-slate-300 text-slate-900 h-10"
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-medium text-xs uppercase">CPF *</Label>
                          <Input
                            value={customerData.cpf}
                            onChange={e => handleInputChange("cpf", formatCPF(e.target.value))}
                            maxLength={14}
                            className="bg-white border-slate-300 text-slate-900 h-10"
                            placeholder="000.000.000-00"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* ETAPA 3: FINALIZAR */}
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-3 px-6">
                  <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                    <Lock className="w-4 h-4 text-slate-500" /> 3. Finalizar Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6 px-6 pb-6">

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  )}

                  {/* CARTÃO */}
                  {paymentMethod === "card" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="min-h-[400px]">
                        <CardPayment
                          initialization={{ amount: finalPrice }}
                          onSubmit={handleCardPayment}
                          customization={{ visual: { style: { theme: 'default' } } }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Ambiente seguro Mercado Pago
                      </p>
                    </div>
                  )}

                  {/* PIX */}
                  {paymentMethod === "pix" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {!isContactValid ? (
                        <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                          <p className="text-slate-500 font-medium text-sm">
                            Preencha todos os dados acima para gerar o QR Code.
                          </p>
                        </div>
                      ) : !pixCopyPaste ? (
                        <Button onClick={handlePixPayment} disabled={isPixLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg font-bold shadow-lg shadow-emerald-600/20 rounded-xl transition-all">
                          {isPixLoading ? <Loader2 className="animate-spin mr-2" /> : `Gerar PIX de R$ ${finalPrice.toFixed(2).replace('.', ',')}`}
                        </Button>
                      ) : (
                        <div className="flex flex-col items-center space-y-6">
                          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                            {pixQrCodeBase64 ? (
                              <img src={`data:image/png;base64,${pixQrCodeBase64}`} alt="QR Code" className="w-56 h-56 mix-blend-multiply" />
                            ) : (
                              <div className="w-56 h-56 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>
                            )}
                          </div>

                          <div className="w-full space-y-2">
                            <Label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pix Copia e Cola</Label>
                            <div className="flex gap-2">
                              <Input readOnly value={pixCopyPaste || ""} className="bg-slate-100 border-slate-200 text-slate-600 font-mono text-xs h-11" />
                              <Button size="icon" variant="outline" className="h-11 w-11 shrink-0 border-slate-200 hover:bg-slate-100" onClick={() => { navigator.clipboard.writeText(pixCopyPaste!); toast({ title: "Copiado!" }) }}>
                                <Copy className="w-4 h-4 text-slate-600" />
                              </Button>
                            </div>
                          </div>

                          <div className="w-full p-4 bg-indigo-50 rounded-lg flex items-center justify-center gap-3 text-indigo-700 text-sm font-medium">
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            <span>Aguardando confirmação...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* CUPOM */}
              <Card className="bg-white border border-slate-200 shadow-sm">
                <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <Label className="flex items-center gap-2 text-indigo-600 font-semibold whitespace-nowrap">
                    <Tag className="w-4 h-4" /> Tem cupom?
                  </Label>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="CÓDIGO"
                      className="bg-white border-slate-300 text-slate-900 h-10 uppercase w-full md:w-40"
                      disabled={isCouponApplied}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isCouponApplied || !couponCode}
                      size="sm"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      {isCouponApplied ? <Check className="w-4 h-4" /> : "Aplicar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* RESUMO */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-slate-200 shadow-sm sticky top-24">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                  <CardTitle className="text-lg font-bold text-slate-900">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-slate-600 font-medium pt-1">Plano {selectedPlan.name}</span>
                    <div className="text-right">
                      <div className="text-slate-900 font-bold text-lg">
                        R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </div>

                  {isCouponApplied && (
                    <div className="flex justify-between items-center text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-100">
                      <span className="font-medium">Cupom aplicado</span>
                      <span className="font-bold">- R$ {discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-slate-600 font-medium">Total</span>
                      <span className="text-3xl font-extrabold text-slate-900">R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </CardContent>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center gap-4 grayscale opacity-60">
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Compra Segura
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;