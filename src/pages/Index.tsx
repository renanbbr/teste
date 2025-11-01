import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import AppleProductsSection from "@/components/AppleProductsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSectionV2 } from "@/components/pricing/PricingSectionV2";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import sealclubLogo from "@/assets/sealclub-logo.png";
import { AnimatedBlueRays } from "@/components/ui/animated-blue-rays";
const Index = () => {
  return <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="relative container px-4 pt-40 pb-20 py-0">
        {/* Background com raios azuis animados */}
        <AnimatedBlueRays />
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Você sempre pagou caro" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="por algo que poderia custar menos. Muito menos." />
            </span>
          </h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left">
            Agora, com o SealClub, você acessa iPhones, Apple Watch, AirPods e até MacBooks{" "}
            <span className="text-white">com preço de custo.</span>
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="flex flex-col sm:flex-row gap-4 items-start">
            <Button size="lg" className="button-gradient">
              Quero ser membro
            </Button>
          </motion.div>
        </div>

        {/* Dashboard integrado na mesma seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 max-w-7xl mx-auto relative"
        >
          {/* Border gradient wrapper */}
          <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5">
            
            {/* Inner container with dark gradient */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-black via-black to-zinc-900/30 shadow-[0_0_50px_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.9)] hover:scale-[1.01] backdrop-blur-xl">
              
              {/* Dashboard Hero Image com filtros */}
              <div className="w-full relative">
                <img 
                  src="/lovable-uploads/dashboard-hero-v2.png"
                  alt="Dashboard do SealClub - Interface de Membros"
                  className="w-full h-auto object-cover rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
                  }}
                />
                
                {/* Filtro/Overlay apenas na parte inferior */}
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent rounded-b-2xl pointer-events-none" />
              </div>
              
              {/* Glass overlay para depth adicional */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

      </motion.section>


      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* New Arrivals Section */}
      <div className="bg-black">
        <NewArrivalsSection />
      </div>
      {/* Branding Section */}
      <section className="bg-black py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container px-4 flex items-center justify-center"
        >
          {/* Video container */}
          <div className="relative w-full max-w-4xl">
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/lovable-uploads/sealclub-branding.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSectionV2 />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div className="bg-black">
        <FAQSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Elevar Sua Experiência Tecnológica?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade que está redefinindo o acesso à tecnologia de ponta. Seu upgrade inteligente começa agora.
          </p>
          <Button size="lg" className="button-gradient">
            Quero Minha Vantagem Exclusiva
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>;
};
export default Index;