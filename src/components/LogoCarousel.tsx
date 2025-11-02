import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    { src: "/brand-logos/dji-logo-new.png", fallback: "/brand-logos/dji-logo-2.png", alt: "DJI" },
    { src: "/brand-logos/apple-logo-new.png", fallback: "/brand-logos/apple-logo.png", alt: "Apple" },
    { src: "/brand-logos/garmin-logo-new.png", fallback: "/brand-logos/garmin-logo.png", alt: "Garmin" },
    { src: "/brand-logos/jbl-logo-new.png", fallback: "/brand-logos/jbl-logo.jpg", alt: "JBL" },
    { src: "/brand-logos/hollyland-logo-new.png", fallback: "/brand-logos/hollyland-logo.png", alt: "Hollyland" },
    { src: "/brand-logos/inow-logo-new.png", fallback: "/brand-logos/inow-logo.png", alt: "Inow" },
    { src: "/brand-logos/motorola-logo-new.png", fallback: "/brand-logos/motorola-logo-2.png", alt: "Motorola" },
    { src: "/brand-logos/ps5-logo-new.png", fallback: "/brand-logos/playstation-logo.png", alt: "PlayStation 5" },
    { src: "/brand-logos/polar-logo-new.png", fallback: "/brand-logos/polar-logo.png", alt: "Polar" },
    { src: "/brand-logos/playstation-logo-new.png", fallback: "/brand-logos/playstation-logo.png", alt: "PlayStation" },
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-black/50 backdrop-blur-sm py-12 mt-20">
      <div className="container mx-auto px-4 relative overflow-hidden">
        {/* Sombra esquerda - fade in */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Sombra direita - fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex items-center space-x-16 h-24"
          initial={{ opacity: 0, x: "0%" }}
          animate={{
            opacity: 1,
            x: "-33.33%"
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: {
              duration: 20,
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
              className="h-20 w-auto object-contain brightness-0 invert transition-opacity duration-300"
              initial={{ opacity: 0.6 }}
              whileHover={{ 
                opacity: 1,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              onError={(e) => {
                const target = e.currentTarget;
                const currentSrc = target.src;
                const fallbackSrc = logo.fallback;
                
                // Se ainda não tentou o fallback e ele existe
                if (fallbackSrc && !currentSrc.includes(fallbackSrc)) {
                  console.warn(`Primary logo failed, trying fallback: ${logo.src} → ${fallbackSrc}`);
                  target.src = fallbackSrc;
                } else {
                  // Se o fallback também falhou ou não existe, esconder
                  console.error(`All logo sources failed for: ${logo.alt}`);
                  target.style.display = 'none';
                }
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;
