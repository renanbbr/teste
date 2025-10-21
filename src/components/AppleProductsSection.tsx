import { motion } from "framer-motion";

export const AppleProductsSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Seu Dashboard de Membro
            </h2>
            <p className="text-lg text-gray-400">
              Gerencie seus benefícios e produtos com facilidade
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-[280px_1fr] gap-0">
              <img 
                src="/lovable-uploads/painel_membro.png"
                alt="Menu do SealClub"
                className="w-full h-auto"
              />
              <img 
                src="/lovable-uploads/painel_club.png"
                alt="Dashboard do SealClub"
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppleProductsSection;