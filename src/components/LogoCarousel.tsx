import { motion } from "framer-motion";

const LogoCarousel = () => {
  // Logos principais (serão renderizadas maiores)
  const mainLogos = [
    { src: "/brand-logos/dji-logo-new.png", alt: "DJI", isMain: true },
    { src: "/brand-logos/apple-logo-new.png", alt: "Apple", isMain: true },
    { src: "/brand-logos/jbl-logo-new.png", alt: "JBL", isMain: true },
    { src: "/brand-logos/ps5-logo-new.png", alt: "PlayStation 5", isMain: true },
  ];

  // Logos normais (menores)
  const normalLogos = [
    { src: "/brand-logos/garmin-logo-new.png", alt: "Garmin", isMain: false },
    { src: "/brand-logos/hollyland-logo-new.png", alt: "Hollyland", isMain: false },
    { src: "/brand-logos/inow-logo-new.png", alt: "Inow", isMain: false },
    { src: "/brand-logos/motorola-logo-new.png", alt: "Motorola", isMain: false },
    { src: "/brand-logos/polar-logo-new.png", alt: "Polar", isMain: false },
    { src: "/brand-logos/playstation-logo-new.png", alt: "PlayStation", isMain: false },
  ];

  // Criar padrão: PRINCIPAL → normal → normal → PRINCIPAL → normal → normal...
  const createPattern = () => {
    const pattern = [];
    let normalIndex = 0;
    
    mainLogos.forEach((mainLogo) => {
      // Adiciona logo principal
      pattern.push(mainLogo);
      
      // Adiciona 2 logos normais
      for (let i = 0; i < 2; i++) {
        pattern.push(normalLogos[normalIndex % normalLogos.length]);
        normalIndex++;
      }
    });
    
    return pattern;
  };

  const logos = createPattern();
  const extendedLogos = [...logos, ...logos, ...logos]; // Triplicar para loop infinito

  return (
    <div className="w-full overflow-hidden bg-black/50 backdrop-blur-sm py-12 mt-20">
      <motion.div 
        className="flex items-center space-x-16 h-24"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "4rem"
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo.src}
            alt={logo.alt}
            className={`w-auto object-contain transition-opacity duration-300 ${
              logo.isMain ? 'h-20' : 'h-14'
            }`}
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: logo.isMain ? 1.1 : 1.05,
              transition: { duration: 0.2 }
            }}
            onError={(e) => {
              console.error(`Failed to load logo: ${logo.src}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
