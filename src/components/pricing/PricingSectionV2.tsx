import { motion } from "framer-motion";
import { Check, X, Gift, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { cn } from "@/lib/utils";
import { BadgeExclusive } from "@/components/ui/badge-exclusive";

const allFeatures = [
  { 
    label: "Produtos por ano", 
    values: { 
      pro: "1", 
      tech: "2", 
      ultra: "3", 
      enterprise: "Sob consulta" 
    }
  },
  { 
    label: "Marcas disponíveis", 
    values: { 
      pro: "Apple, JBL, DJI, Hollyland, Garmin, Polar e muito mais.", 
      tech: "Apple, JBL, DJI, Hollyland, Garmin, Polar e muito mais.", 
      ultra: "Apple, JBL, DJI, Hollyland, Garmin, Polar e muito mais.", 
      enterprise: "Sob consulta" 
    } 
  },
  { label: "Preço de custo", values: { pro: true, tech: true, ultra: true, enterprise: "Sob consulta" } },
  { 
    label: "Frete grátis", 
    values: { pro: false, tech: false, ultra: true, enterprise: "Sob consulta" } 
  },
  { 
    label: "Aparelho reserva", 
    values: { pro: false, tech: true, ultra: true, enterprise: "Sob consulta" }
  },
  { 
    label: "Transferência de dados", 
    values: { pro: false, tech: true, ultra: true, enterprise: "Sob consulta" }
  },
  { 
    label: "Preço congelado por 1 ano", 
    values: { pro: false, tech: false, ultra: true, enterprise: "Sob consulta" },
    exclusive: { ultra: true }
  },
  { label: "Assistência Técnica 24h", values: { pro: false, tech: false, ultra: true, enterprise: "Sob consulta" } },
  { label: "SealCare", values: { pro: false, tech: false, ultra: true, enterprise: "Sob consulta" } },
  
  { label: "Cupom Assistência Técnica", values: { pro: "5%", tech: "10%", ultra: "20%", enterprise: "Sob consulta" } },
  { 
    label: "Cashback Acessórios", 
    labelByPlan: { 
      pro: "Cupom de Acessórios", 
      tech: "Cupom de Acessórios", 
      ultra: "Cashback Acessórios", 
      enterprise: "Cashback Acessórios" 
    }, 
    values: { pro: "5%", tech: "10%", ultra: "R$ 500", enterprise: "Sob consulta" } 
  },
  { label: "Acesso antecipado", values: { pro: true, tech: true, ultra: true, enterprise: "Sob consulta" } },
  { label: "Atendimento Prioritário", values: { pro: true, tech: true, ultra: true, enterprise: "Sob consulta" } },
  { label: "Suporte", values: { pro: "Premium", tech: "Vitalício", ultra: "Vitalício", enterprise: "Sob consulta" } },
  { 
    label: "Fone Dunx Bluetooth incluso", 
    values: { pro: false, tech: false, ultra: true, enterprise: false },
    isBonus: true,
    bonusLabel: "Bônus Fone Bluetooth Dunx"
  },
  { 
    label: "SealPass", 
    values: { pro: true, tech: true, ultra: true, enterprise: true },
    isBonus: true,
    bonusLabel: "Bônus SealPass"
  }
];

const PricingTier = ({
  name,
  price,
  period,
  description,
  planKey,
  isFeatured,
  ctaText,
  ctaLink,
  isEnterprise,
  showPriceAlert = false,
  isMetallic = false,
}: {
  name: string;
  price: string;
  period?: string;
  description?: string;
  planKey: 'pro' | 'tech' | 'ultra' | 'enterprise';
  isFeatured?: boolean;
  ctaText: string;
  ctaLink: string;
  isEnterprise?: boolean;
  showPriceAlert?: boolean;
  isMetallic?: boolean;
}) => (
  <CardSpotlight 
    className={cn(
      "h-full border-2",
      isFeatured && "border-primary",
      isMetallic && "border-[#C0C0C0] shadow-[0_0_20px_rgba(192,192,192,0.3)]",
      !isFeatured && !isMetallic && "border-white/10"
    )}
  >
    <div className="relative h-full p-6 flex flex-col">
      {isFeatured && (
        <span className="absolute top-4 right-4 text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1">
          Popular
        </span>
      )}
      <div className="h-[180px] flex flex-col">
        <h3 className="text-2xl font-medium mb-2">{name}</h3>
        
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
        
        {showPriceAlert && (
          <div className="flex items-center gap-1.5 mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wide">
              Preço aumentará em breve
            </span>
          </div>
        )}
        
        {description && <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{description}</p>}
      </div>
      
      <Button 
        className="button-gradient w-full mb-6"
        onClick={(e) => {
          e.preventDefault();
          
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: isEnterprise ? 'whatsapp_click' : 'checkout_click',
            plan_name: name,
            plan_price: price,
            button_text: ctaText,
            button_location: 'pricing_section',
            page_url: window.location.href,
            click_url: ctaLink
          });
          
          setTimeout(() => {
            window.open(ctaLink, '_blank');
          }, 300);
        }}
      >
        {ctaText}
      </Button>
      
      <div className="space-y-2 flex-grow">
        {allFeatures.map((feature, index) => {
          const value = feature.values[planKey];
          const isBonus = (feature as any).isBonus;
          const isExclusive = (feature as any).exclusive?.[planKey];
          
          return (
            <div 
              key={index} 
              className="flex items-start justify-between py-3 border-b border-white/5 min-h-[52px]"
            >
              <div className="flex-1 pr-2">
                <span className="text-xs font-medium leading-tight flex items-center gap-2 text-muted-foreground flex-wrap">
                  {isBonus && value ? (
                    <>
                      <Gift className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold bg-primary/10 text-primary rounded px-2 py-1">
                        {(feature as any).bonusLabel || feature.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {(feature as any).labelByPlan 
                          ? (feature as any).labelByPlan[planKey] 
                          : feature.label}
                      </span>
                      {isExclusive && (
                        <BadgeExclusive className="ml-1" />
                      )}
                    </>
                  )}
                </span>
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                {typeof value === "boolean" ? (
                  value ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500/50" />
                  )
                 ) : (
                   <span className="text-xs font-medium text-right max-w-[180px] leading-tight">
                     {value}
                   </span>
                 )}
              </div>
            </div>
          );
        })}
      </div>
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
          className="text-4xl md:text-5xl font-normal mb-6 tracking-tight"
        >
          Quatro níveis. Um único objetivo:{" "}
          <span className="text-gradient font-medium">Te dar acesso ao que ninguém mais tem.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-400"
        >
          O SealClub não é sobre gastar menos. É sobre ter mais: mais benefícios, mais poder de compra, mais vantagens. Escolha o plano que mais combina com você:
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto items-start">
        <PricingTier
          name="PRO"
          price="R$ 29"
          period="mês"
          planKey="pro"
          ctaText="ASSINAR O PRO"
          ctaLink="https://lastlink.com/p/CF53C574F/checkout-payment/"
          showPriceAlert
        />
        <PricingTier
          name="TECH"
          price="R$ 49"
          period="mês"
          planKey="tech"
          isFeatured
          ctaText="ASSINAR O TECH"
          ctaLink="https://lastlink.com/p/C9236DD3C/checkout-payment/"
          showPriceAlert
        />
        <PricingTier
          name="ULTRA"
          price="R$ 79"
          period="mês"
          planKey="ultra"
          ctaText="ASSINAR O ULTRA"
          ctaLink="https://lastlink.com/p/C8B2B72CA/checkout-payment/"
          showPriceAlert
        />
        <PricingTier
          name="ENTERPRISE"
          price="Sob consulta"
          description="Plano corporativo para empresas."
          planKey="enterprise"
          isEnterprise
          isMetallic
          ctaText="Falar com um consultor"
          ctaLink="https://wa.me/53991963971"
        />
      </div>
    </section>
  );
};
