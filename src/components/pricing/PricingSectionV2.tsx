import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";

const PricingTier = ({
  name,
  price,
  period,
  description,
  features,
  isFeatured,
  ctaText,
  isEnterprise,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  ctaText: string;
  isEnterprise?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isFeatured ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isFeatured && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Destaque
        </span>
      )}
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
      <p className="text-muted-foreground mb-6 text-sm">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        {ctaText}
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSectionV2 = () => {
  return (
    <section className="container px-4 py-24">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <PricingTier
          name="PRO"
          price="R$ 29"
          period="mês"
          description="Ideal para quem deseja economia na compra de um único Apple por ano."
          features={[
            "1 produto Apple por ano",
            "iPhone, iPad, Mac, Apple Watch, AirPods",
            "Acesso antecipado a lançamentos",
            "Suporte básico",
            "Cartão digital personalizado"
          ]}
          ctaText="ASSINAR O START"
        />
        <PricingTier
          name="TECH"
          price="R$ 49"
          period="mês"
          description="Produtos de marcas tech com preço de custo, até 2 por ano."
          features={[
            "2 produtos por ano",
            "DJI, Garmin, JBL, Polar, Hollyland",
            "Drones e wearables com preço de custo",
            "Benefícios em acessórios e serviços",
            "Cartão físico premium"
          ]}
          ctaText="ASSINAR O PRIME"
        />
        <PricingTier
          name="ULTRA"
          price="R$ 79"
          period="mês"
          description="Acesso total ao clube com até 4 produtos por ano de qualquer marca."
          features={[
            "4 produtos por ano",
            "Todas as marcas: Apple + Tech",
            "Liberdade total para misturar categorias",
            "Atendimento VIP e suporte vitalício",
            "Benefícios acumulativos"
          ]}
          isFeatured
          ctaText="ASSINAR O ULTRA"
        />
        <PricingTier
          name="ENTERPRISE"
          price="Sob consulta"
          description="Plano corporativo para empresas."
          features={[
            "Produtos ilimitados por ano (negociável)",
            "Todas as marcas disponíveis",
            "Acesso corporativo com maior volume",
            "Consultoria dedicada",
            "Painel personalizado"
          ]}
          isEnterprise
          ctaText="SABER MAIS"
        />
      </div>
    </section>
  );
};
