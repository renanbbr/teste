import { FeatureTab } from "./FeatureTab";
import { features } from "@/config/features";

export const FeaturesSection = () => {
  return (
    <section className="container px-4 py-24">
      {/* Header Section */}
      <div className="max-w-3xl mb-20">
        <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight text-left">
          O SealClub é o primeiro clube de compras do Brasil com acesso a Apple e marcas premium{" "}
          <span className="text-gradient font-medium">com preço de custo.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 text-left">
          Uma assinatura anual que transforma sua relação com a tecnologia. Economia inteligente, acesso privilegiado e a certeza de estar sempre um passo à frente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature) => (
          <div key={feature.title}>
            <FeatureTab
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              isActive={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};