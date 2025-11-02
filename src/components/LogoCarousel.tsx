import { motion } from "framer-motion";

interface LogoCarouselProps {
  className?: string;
}

const logos = [
  { src: "/brand-logos/apple-logo-new.png", alt: "Apple" },
  { src: "/brand-logos/dji-logo-new.png", alt: "DJI" },
  { src: "/brand-logos/garmin-logo-new.png", alt: "Garmin" },
  { src: "/brand-logos/jbl-logo-new.png", alt: "JBL" },
  { src: "/brand-logos/motorola-logo-new.png", alt: "Motorola" },
  { src: "/brand-logos/playstation-logo-new.png", alt: "PlayStation" },
  { src: "/brand-logos/polar-logo-new.png", alt: "Polar" },
  { src: "/brand-logos/hollyland-logo-new.png", alt: "Hollyland" },
  { src: "/brand-logos/starlink-logo.png", alt: "Starlink" },
  { src: "/brand-logos/stanley-logo.png", alt: "Stanley" },
  { src: "/brand-logos/inow-logo-new.png", alt: "Inow" },
];

const LogoCarousel = ({ className }: LogoCarouselProps) => {
  return (
    <div className="w-full bg-black/50 pb-12">
      <div className="container mx-auto px-4 relative overflow-hidden">
        {/* Sombra esquerda - fade in */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Sombra direita - fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex items-center h-24 gap-16"
          animate={{
            x: [0, -1000]
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
          style={{
            width: "fit-content",
          }}
        >
          {/* Repetir logos 3 vezes para loop seamless */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-16">
              {logos.map((logo, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 w-auto object-contain"
                    style={{ 
                      imageRendering: 'crisp-edges',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      filter: 'saturate(0) invert(1) brightness(1.2)'
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;
