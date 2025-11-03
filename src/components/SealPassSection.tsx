import { motion } from "framer-motion";

interface SealPassSectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  videoSrc: string;
}

const allLogos = [
  { src: "/partner-logos/q-caroline-fit.png", alt: "Q Caroline Fit" },
  { src: "/partner-logos/heinze-excursoes.png", alt: "Heinze Excursões" },
  { src: "/partner-logos/italo-caldeira.png", alt: "Ítalo Caldeira Nutricionista" },
  { src: "/partner-logos/lancheria-pelotense.png", alt: "Lancheria Pelotense Bar" },
  { src: "/partner-logos/nina-doces.png", alt: "Nina Doces de Pelotas" },
  { src: "/partner-logos/nina-fit.png", alt: "Nina Fit Doces Proteicos" },
  { src: "/partner-logos/ubuntu.svg", alt: "Ubuntu" },
  { src: "/partner-logos/yellow-brownie.png", alt: "I'low Yellow Brownie" }
];

export const SealPassSection = ({ 
  title, 
  titleHighlight, 
  subtitle, 
  videoSrc 
}: SealPassSectionProps) => {
  return (
    <section className="relative bg-black pt-20 pb-8 overflow-hidden my-0 py-[8px]">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{
          objectFit: 'cover',
          zIndex: 0
        }}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-[1]" />
      </div>

      {/* Overlay escuro universal (mobile e desktop) */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] z-[2]" />
      
      {/* Título e Subtítulo da Section */}
      <div className="container px-4 relative z-10 mb-8">
        {/* Título */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-4xl md:text-5xl font-normal mb-6 tracking-tight text-center"
        >
          {title}{" "}
          <span className="text-gradient font-medium">{titleHighlight}</span>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.1 }} 
          className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="container px-4 relative z-10 my-0 py-0">
        {/* Carrossel de logos sobreposto */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="relative z-10"
        >
          <div className="flex flex-col items-center justify-center gap-8 py-8">
            {/* Linha superior - move para direita */}
            <div className="w-full overflow-hidden">
              <div className="relative flex">
                <div className="animate-marquee-partners flex min-w-full shrink-0 items-center gap-10">
                  {allLogos.map((logo, index) => (
                    <motion.div 
                      key={`top-1-${index}`} 
                      className="flex-shrink-0 pointer-events-auto group" 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-28 h-28 md:w-32 md:h-32 
                                bg-[#1B1B1B]/40 backdrop-blur-xl 
                                border border-white/10
                                rounded-2xl 
                                shadow-2xl shadow-black/40
                                flex items-center justify-center
                                overflow-hidden
                                transition-all duration-300
                                group-hover:border-white/20
                                group-hover:bg-[#1B1B1B]/60">
                        
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="relative z-10 w-20 h-20 md:w-24 md:h-24 
                                    object-contain
                                    filter brightness-100 contrast-100
                                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                                    transition-all duration-300
                                    group-hover:scale-105"
                          style={{ mixBlendMode: 'normal' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="animate-marquee-partners flex min-w-full shrink-0 items-center gap-10">
                  {allLogos.map((logo, index) => (
                    <motion.div 
                      key={`top-2-${index}`} 
                      className="flex-shrink-0 pointer-events-auto group" 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-24 h-24 md:w-28 md:h-28 
                                    bg-[#1B1B1B]/40 backdrop-blur-xl 
                                    border border-white/10
                                    rounded-2xl 
                                    shadow-2xl shadow-black/60
                                    flex items-center justify-center
                                    overflow-hidden
                                    transition-all duration-300
                                    group-hover:border-white/20
                                    group-hover:bg-[#1B1B1B]/60">
                        
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                    object-contain
                                    filter brightness-95 contrast-105
                                    transition-all duration-300
                                    group-hover:scale-105"
                          style={{ mixBlendMode: 'normal' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Linha inferior - move para esquerda */}
            <div className="w-full overflow-hidden">
              <div className="relative flex">
                <div className="animate-marquee-partners-reverse flex min-w-full shrink-0 items-center gap-10">
                  {allLogos.map((logo, index) => (
                    <motion.div 
                      key={`bottom-1-${index}`} 
                      className="flex-shrink-0 pointer-events-auto group" 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-24 h-24 md:w-28 md:h-28 
                                    bg-[#1B1B1B]/40 backdrop-blur-xl 
                                    border border-white/10 
                                    rounded-2xl 
                                    shadow-2xl shadow-black/60
                                    flex items-center justify-center
                                    overflow-hidden
                                    transition-all duration-300
                                    group-hover:border-white/20
                                    group-hover:bg-[#1B1B1B]/60">
                        
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                    object-contain
                                    filter brightness-95 contrast-105
                                    transition-all duration-300
                                    group-hover:scale-105"
                          style={{ mixBlendMode: 'normal' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="animate-marquee-partners-reverse flex min-w-full shrink-0 items-center gap-10">
                  {allLogos.map((logo, index) => (
                    <motion.div 
                      key={`bottom-2-${index}`} 
                      className="flex-shrink-0 pointer-events-auto group" 
                      whileHover={{ scale: 1.05, y: -5 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-24 h-24 md:w-28 md:h-28 
                                    bg-[#1B1B1B]/40 backdrop-blur-xl 
                                    border border-white/10 
                                    rounded-2xl 
                                    shadow-2xl shadow-black/60
                                    flex items-center justify-center
                                    overflow-hidden
                                    transition-all duration-300
                                    group-hover:border-white/20
                                    group-hover:bg-[#1B1B1B]/60">
                        
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                    object-contain
                                    filter brightness-95 contrast-105
                                    transition-all duration-300
                                    group-hover:scale-105"
                          style={{ mixBlendMode: 'normal' }}
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
        </motion.div>
      </div>
    </section>
  );
};
