import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        Quero Aproveitar
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          A diferença é tão absurda{" "}
          <span className="text-gradient font-medium">que parece mentira</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Com o mesmo produto, da mesma marca, com a mesma garantia… você pode economizar centenas ou milhares de reais. Todos os anos.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Start"
          price="R$ 997"
          description="Para você que quer começar a economizar agora"
          features={[
            "Acesso a preço de custo",
            "1 resgate por ano",
            "Suporte exclusivo",
            "Garantia completa",
            "Frete grátis"
          ]}
        />
        <PricingTier
          name="Prime"
          price="R$ 1.497"
          description="O plano mais popular para quem quer mais benefícios"
          features={[
            "Tudo do Start",
            "2 resgates por ano",
            "Aparelho reserva",
            "Desconto vitalício em acessórios",
            "Kit de acessórios premium anual",
            "Assistência técnica a preço de custo"
          ]}
          isPopular
        />
        <PricingTier
          name="Ultra"
          price="R$ 2.497"
          description="Exclusividade máxima com benefícios ilimitados"
          features={[
            "Tudo do Prime",
            "Resgates ilimitados",
            "Prioridade absoluta",
            "Consultor pessoal dedicado",
            "Acesso antecipado a lançamentos",
            "Benefícios vitalícios"
          ]}
        />
      </div>
    </section>
  );
};