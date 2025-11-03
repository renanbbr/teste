import { motion } from "framer-motion";
import { Button } from "./ui/button";
import sealclubLogo from "@/assets/sealclub-logo.png";

const SealPassSection = () => {
  // Array de logos dos parceiros (usando logos existentes como placeholders)
  const partnerLogos = [{
    src: "/brand-logos/apple-logo-new.png",
    alt: "Parceiro Apple"
  }, {
    src: "/brand-logos/dji-logo-new.png",
    alt: "Parceiro DJI"
  }, {
    src: "/brand-logos/motorola-logo-new.png",
    alt: "Parceiro Motorola"
  }, {
    src: "/brand-logos/jbl-logo.jpg",
    alt: "Parceiro JBL"
  }, {
    src: "/brand-logos/garmin-logo.png",
    alt: "Parceiro Garmin"
  }, {
    src: "/brand-logos/playstation-logo.png",
    alt: "Parceiro PlayStation"
  }, {
    src: "/brand-logos/polar-logo.png",
    alt: "Parceiro Polar"
  }, {
    src: "/brand-logos/hollyland-logo-new.png",
    alt: "Parceiro Hollyland"
  }];

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)]" />
      
      <div className="container px-4 relative z-10">
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
          SealPass: faça parte da nossa{" "}
          <span className="text-gradient">comunidade e economize todos os dias</span>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
        >
          Descontos e experiências exclusivas com marcas que fazem parte da comunidade Seal.
          Cada parceria foi escolhida a dedo para oferecer vantagens reais ao membro SealClub.
        </motion.p>

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
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full 
                            bg-gradient-radial from-blue-500/40 via-cyan-500/20 to-transparent
                            blur-3xl" />
            </motion.div>

            {/* Segunda camada de aura (laranja/vermelha) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full 
                            bg-gradient-radial from-orange-500/30 via-red-500/15 to-transparent
                            blur-2xl" />
            </motion.div>

            {/* Logo da Seal */}
            <motion.div
              className="relative z-20 flex items-center justify-center"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={sealclubLogo}
                alt="SealClub Logo"
                className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-70 drop-shadow-2xl 
                           drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]"
              />
            </motion.div>

            {/* Carrossel de logos dos parceiros em containers glass */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex overflow-hidden py-4 w-full">
                <div className="animate-marquee flex min-w-full shrink-0 items-center gap-8">
                  {partnerLogos.map((logo, index) => (
                    <motion.div
                      key={`${index}-1`}
                      className="flex-shrink-0 pointer-events-auto group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Container Glass */}
                      <div className="relative w-28 h-28 md:w-32 md:h-32 
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
                          className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain
                                     brightness-90 contrast-110
                                     transition-all duration-300
                                     group-hover:brightness-110 group-hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="animate-marquee flex min-w-full shrink-0 items-center gap-8">
                  {partnerLogos.map((logo, index) => (
                    <motion.div
                      key={`${index}-2`}
                      className="flex-shrink-0 pointer-events-auto group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Container Glass */}
                      <div className="relative w-28 h-28 md:w-32 md:h-32 
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
                          className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain
                                     brightness-90 contrast-110
                                     transition-all duration-300
                                     group-hover:brightness-110 group-hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
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
  );
};

export default SealPassSection;
