import { motion } from "framer-motion";
import { Button } from "./ui/button";
import sealclubLogo from "@/assets/sealclub-logo.png";

const SealPassSection = () => {
  // Array de logos dos parceiros (usando logos existentes como placeholders)
  const partnerLogos = [
    { src: "/brand-logos/apple-logo-new.png", alt: "Parceiro Apple" },
    { src: "/brand-logos/dji-logo-new.png", alt: "Parceiro DJI" },
    { src: "/brand-logos/motorola-logo-new.png", alt: "Parceiro Motorola" },
    { src: "/brand-logos/jbl-logo-new.png", alt: "Parceiro JBL" },
    { src: "/brand-logos/garmin-logo-new.png", alt: "Parceiro Garmin" },
    { src: "/brand-logos/playstation-logo-new.png", alt: "Parceiro PlayStation" },
    { src: "/brand-logos/polar-logo-new.png", alt: "Parceiro Polar" },
    { src: "/brand-logos/hollyland-logo-new.png", alt: "Parceiro Hollyland" },
  ];

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
          SealPass: conecte-se ao{" "}
          <span className="text-gradient">ecossistema local</span>
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
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full 
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
              <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full 
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
                className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              />
            </motion.div>

            {/* Carrossel de logos dos parceiros */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 md:gap-16 pointer-events-none">
              {/* Linha superior de logos */}
              <div className="w-full overflow-hidden">
                <motion.div
                  className="flex items-center gap-8 md:gap-16"
                  animate={{
                    x: [0, -1600],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ width: "fit-content" }}
                >
                  {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <div
                      key={`top-${index}`}
                      className="flex-shrink-0 pointer-events-auto"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 md:h-14 w-auto object-contain opacity-30 hover:opacity-100 
                                 brightness-0 invert blur-[0.5px] hover:blur-0
                                 transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Linha inferior de logos (direção oposta) */}
              <div className="w-full overflow-hidden">
                <motion.div
                  className="flex items-center gap-8 md:gap-16"
                  animate={{
                    x: [-1600, 0],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ width: "fit-content" }}
                >
                  {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <div
                      key={`bottom-${index}`}
                      className="flex-shrink-0 pointer-events-auto"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 md:h-14 w-auto object-contain opacity-30 hover:opacity-100 
                                 brightness-0 invert blur-[0.5px] hover:blur-0
                                 transition-all duration-300 hover:scale-110"
                      />
                    </div>
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
  );
};

export default SealPassSection;