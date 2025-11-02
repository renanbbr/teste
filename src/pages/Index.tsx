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
                  src="/lovable-uploads/dashboard-hero-v4.png"
                  alt="Dashboard do SealClub - Interface de Membros"
                  className="w-full h-auto object-cover rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
                  }}
                />
                
                {/* Filtro/Overlay apenas na parte inferior */}
                <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-b-2xl pointer-events-none" />
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
      {/* Branding Section / SealPass Section */}
      <section className="relative bg-black py-32 overflow-hidden">
        {/* Background com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)]" />
        
        {/* Título e Subtítulo da Section */}
        <div className="container px-4 relative z-10 mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center px-6 py-2 rounded-full 
                           bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                           border border-blue-500/20 text-sm font-medium text-blue-400">
              SEAL PASS
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            SealPass: conecte-se ao{" "}
            <span className="text-gradient">ecossistema</span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto"
          >
            Descontos e experiências exclusivas com marcas que fazem parte da comunidade Seal.
            Cada parceria foi escolhida a dedo para oferecer vantagens reais ao membro SealClub.
          </motion.p>
        </div>

        <div className="container px-4 relative z-10">
          {/* Video do SealClub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-20"
          >
            <div className="relative w-full max-w-5xl">
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

          {/* Container central com logo e carrossel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-6xl mx-auto mb-12"
          >
            {/* Logo central com aura energética */}
            <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]">
              {/* Aura animada principal (azul) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-[350px] h-[350px] md:w-[480px] md:h-[480px] rounded-full 
                              bg-gradient-radial from-blue-500/40 via-cyan-500/20 to-transparent
                              blur-3xl" />
              </motion.div>

              {/* Segunda camada de aura (laranja/vermelha) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="w-[330px] h-[330px] md:w-[460px] md:h-[460px] rounded-full 
                              bg-gradient-radial from-orange-500/30 via-red-500/15 to-transparent
                              blur-2xl" />
              </motion.div>

              {/* Logo da Seal */}
              <motion.div
                className="relative z-20 flex items-center justify-center"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={sealclubLogo}
                  alt="SealClub Logo"
                  className="w-56 h-56 md:w-80 md:h-80 object-contain opacity-70 drop-shadow-2xl 
                             drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]"
                />
              </motion.div>

              {/* Carrossel de logos dos parceiros em containers glass */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 md:gap-20">
                {/* Linha superior de logos */}
                <div className="w-full overflow-hidden">
                  <motion.div
                    className="flex items-center justify-center gap-6 md:gap-12"
                    animate={{
                      x: [0, -1200],
                    }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                  >
                    {[
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                    ].map((logo, index) => (
                      <motion.div
                        key={`top-${index}`}
                        className="flex-shrink-0 pointer-events-auto group"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Container Glass */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 
                                       bg-black/40 backdrop-blur-lg 
                                       border border-white/10 
                                       rounded-2xl md:rounded-3xl 
                                       shadow-xl shadow-black/50
                                       flex items-center justify-center
                                       overflow-hidden
                                       transition-all duration-300
                                       group-hover:border-white/30
                                       group-hover:bg-black/60
                                       group-hover:shadow-2xl
                                       group-hover:shadow-blue-500/20">
                          
                          {/* Brilho interno no hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 
                                         group-hover:from-blue-500/10 group-hover:to-cyan-500/10 
                                         transition-all duration-300" />
                          
                          {/* Logo */}
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="relative z-10 w-8 h-8 md:w-10 md:h-10 object-contain
                                     brightness-90 contrast-110
                                     transition-all duration-300
                                     group-hover:brightness-110 group-hover:scale-110"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Linha inferior de logos (direção oposta) */}
                <div className="w-full overflow-hidden">
                  <motion.div
                    className="flex items-center justify-center gap-6 md:gap-12"
                    animate={{
                      x: [-1200, 0],
                    }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                  >
                    {[
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                      { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
                      { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
                      { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
                      { src: "/brand-logos/jbl-logo.jpg", alt: "Parceiro JBL" },
                      { src: "/brand-logos/garmin-logo.png", alt: "Parceiro Garmin" },
                      { src: "/brand-logos/playstation-logo.png", alt: "Parceiro PlayStation" },
                      { src: "/brand-logos/polar-logo.png", alt: "Parceiro Polar" },
                      { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
                    ].map((logo, index) => (
                      <motion.div
                        key={`bottom-${index}`}
                        className="flex-shrink-0 pointer-events-auto group"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Container Glass */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 
                                       bg-black/40 backdrop-blur-lg 
                                       border border-white/10 
                                       rounded-2xl md:rounded-3xl 
                                       shadow-xl shadow-black/50
                                       flex items-center justify-center
                                       overflow-hidden
                                       transition-all duration-300
                                       group-hover:border-white/30
                                       group-hover:bg-black/60
                                       group-hover:shadow-2xl
                                       group-hover:shadow-blue-500/20">
                          
                          {/* Brilho interno no hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 
                                         group-hover:from-blue-500/10 group-hover:to-cyan-500/10 
                                         transition-all duration-300" />
                          
                          {/* Logo */}
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="relative z-10 w-8 h-8 md:w-10 md:h-10 object-contain
                                     brightness-90 contrast-110
                                     transition-all duration-300
                                     group-hover:brightness-110 group-hover:scale-110"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Button size="lg" className="button-gradient">
              🪩 Ver todos os parceiros do Seal Pass
            </Button>
          </motion.div>
        </div>
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