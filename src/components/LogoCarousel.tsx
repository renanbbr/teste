import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    "/brand-logos/apple-logo.jpg",
    "/brand-logos/playstation-logo.png",
    "/brand-logos/jbl-logo.jpg",
    "/brand-logos/garmin-logo.png",
    "/brand-logos/hollyland-logo.png",
    "/brand-logos/polar-logo.jpg",
    "/brand-logos/motorola-logo.svg",
    "/brand-logos/inow-logo.png",
    "/brand-logos/starlink-logo.png",
    "/brand-logos/xiaomi-logo.jpg",
    "/brand-logos/stanley-logo.png",
    "/brand-logos/amazon-logo.png",
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-black/50 backdrop-blur-sm py-12 mt-20">
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
            className="h-16 object-contain"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onError={(e) => {
              console.error(`Failed to load logo: ${logo}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;