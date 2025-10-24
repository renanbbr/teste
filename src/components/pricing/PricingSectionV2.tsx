import { motion } from "framer-motion";
import { Check, X, Gift, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";

const allFeatures = [
  { label: "Produtos por ano", values: { pro: "1 Apple", tech: "2 Tech", ultra: "4 qualquer marca", enterprise: "Ilimitado" } },
  { label: "Marcas disponíveis", values: { pro: "Apple", tech: "DJI, Garmin, JBL, Polar, Hollyland", ultra: "Apple + Tech", enterprise: "Todas" } },
  { label: "Preço de custo", values: { pro: true, tech: true, ultra: true, enterprise: true } },
  { label: "Frete grátis", values: { pro: false, tech: false, ultra: true, enterprise: true } },
  { label: "Aparelho reserva", values: { pro: false, tech: false, ultra: true, enterprise: true } },
  { label: "Transferência de dados", values: { pro: false, tech: false, ultra: true, enterprise: true } },
  { label: "Kit SealClub Experience", values: { pro: false, tech: false, ultra: true, enterprise: true } },
  { label: "Cupom Assistência Técnica", values: { pro: "5%", tech: "10%", ultra: "15%", enterprise: true } },
  { label: "Cupom Acessórios", values: { pro: "5%", tech: "10%", ultra: "15%", enterprise: true } },
  { label: "Acesso antecipado", values: { pro: true, tech: true, ultra: true, enterprise: true } },
  { label: "Suporte", values: { pro: "Premium", tech: "Vitalício", ultra: "Vitalício", enterprise: "Dedicado" } },
  { label: "Bônus SealPass", values: { pro: true, tech: true, ultra: true, enterprise: true }, isBonus: true }
];

const PricingTier = ({
  name,
  price,
  period,
  description,
  planKey,
  isFeatured,
  ctaText,
  isEnterprise,
  showPriceAlert = false,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  planKey: 'pro' | 'tech' | 'ultra' | 'enterprise';
  isFeatured?: boolean;
  ctaText: string;
  isEnterprise?: boolean;
  showPriceAlert?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isFeatured ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isFeatured && (
        <span className="absolute top-4 right-4 text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1">
          Destaque
        </span>
      )}
      <div className="h-[180px] flex flex-col">
        <h3 className="text-2xl font-medium mb-2">{name}</h3>
        
        {showPriceAlert && (
          <div className="flex items-center gap-1.5 mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wide">
              Preço aumentará em breve
            </span>
          </div>
        )}
        
        <div className="mb-4">
          {isEnterprise ? (
            <span className="text-3xl font-bold">{price}</span>
          ) : (
            <>
              <span className="text-4xl font-bold">{price}</span>
              {period && <span className="text-muted-foreground">/{period}</span>}
            </>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{description}</p>
      </div>
      
      <div className="space-y-2 mb-8 flex-grow">
        {allFeatures.map((feature, index) => {
          const value = feature.values[planKey];
          const isBonus = (feature as any).isBonus;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between py-3 border-b border-white/5 h-[52px]"
            >
              <span className="text-xs font-medium leading-tight flex items-center gap-2 text-muted-foreground">
                {isBonus && planKey !== 'enterprise' ? (
                  <>
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold bg-primary/10 text-primary rounded px-2 py-1">
                      Bônus SealPass
                    </span>
                  </>
                ) : (
                  feature.label
                )}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                {typeof value === "boolean" ? (
                  value ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500/50" />
                  )
                ) : (
                  <span className="text-xs font-medium text-right max-w-[120px] leading-tight">
                    {value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <Button className="button-gradient w-full">
        {ctaText}
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSectionV2 = () => {
  return (
    <section id="pricing" className="container px-4 py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-normal mb-6"
        >
          Quatro níveis. Um único objetivo:{" "}
          <span className="text-gradient font-medium">Te dar acesso ao que ninguém mais tem.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-muted-foreground"
        >
          O SealClub não é sobre gastar menos. É sobre ter mais: mais benefícios, mais poder de compra, mais vantagens. Escolha o plano que mais combina com você:
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto items-start">
        <PricingTier
          name="PRO"
          price="R$ 29"
          period="mês"
          description="Ideal para quem deseja economia na compra de um único Apple por ano."
          planKey="pro"
          ctaText="ASSINAR O PRO"
          showPriceAlert
        />
        <PricingTier
          name="TECH"
          price="R$ 49"
          period="mês"
          description="Produtos de marcas tech com preço de custo, até 2 por ano."
          planKey="tech"
          ctaText="ASSINAR O TECH"
          showPriceAlert
        />
        <PricingTier
          name="ULTRA"
          price="R$ 79"
          period="mês"
          description="Acesso total ao clube com até 4 produtos por ano de qualquer marca."
          planKey="ultra"
          isFeatured
          ctaText="ASSINAR O ULTRA"
          showPriceAlert
        />
        <PricingTier
          name="ENTERPRISE"
          price="Sob consulta"
          description="Plano corporativo para empresas."
          planKey="enterprise"
          isEnterprise
          ctaText="SABER MAIS"
        />
      </div>
    </section>
  );
};
