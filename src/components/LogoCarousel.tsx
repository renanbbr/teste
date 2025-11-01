import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    { src: "/brand-logos/dji-logo-new.png", alt: "DJI" },
    { src: "/brand-logos/apple-logo-new.png", alt: "Apple" },
    { src: "/brand-logos/garmin-logo-new.png", alt: "Garmin" },
    { src: "/brand-logos/jbl-logo-new.png", alt: "JBL" },
    { src: "/brand-logos/hollyland-logo-new.png", alt: "Hollyland" },
    { src: "/brand-logos/inow-logo-new.png", alt: "Inow" },
    { src: "/brand-logos/motorola-logo-new.png", alt: "Motorola" },
    { src: "/brand-logos/ps5-logo-new.png", alt: "PlayStation 5" },
    { src: "/brand-logos/polar-logo-new.png", alt: "Polar" },
    { src: "/brand-logos/playstation-logo-new.png", alt: "PlayStation" },
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-black/50 backdrop-blur-sm py-12 mt-20">
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
