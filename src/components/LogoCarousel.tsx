import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    "/brand-logos/amazon-logo.png",
    "/brand-logos/coswheel-logo.png",
    "/brand-logos/dji-logo.png",
    "/brand-logos/garmin-logo.jpg",
    "/brand-logos/hollyland-logo.png",
    "/brand-logos/inow-logo.png",
    "/brand-logos/motorola-logo.png",
    "/brand-logos/playstation-logo.png",
    "/brand-logos/polar-logo.jpg",
    "/brand-logos/stanley-logo.png",
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
      <motion.div 
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15, // Reduced from 25 to 15 seconds
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
            src={logo}
            alt={`Partner logo ${index + 1}`}
            className="h-8 object-contain"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;