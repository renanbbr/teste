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
              Produtos Apple em Destaque
            </h2>
            <p className="text-lg text-gray-400">
              Descubra a nova geração de dispositivos Apple
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/apple-products-dashboard.jpg"
              alt="Dashboard de Produtos Apple"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppleProductsSection;