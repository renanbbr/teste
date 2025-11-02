import { motion } from "framer-motion";

interface LogoCarouselProps {
  className?: string;
}

const LogoCarousel = ({ className }: LogoCarouselProps) => {
  return (
    <div className="w-full bg-black/50 pb-12">
      <div className="container mx-auto px-4 relative overflow-hidden">
        {/* Sombra esquerda - fade in */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Sombra direita - fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex items-center h-24"
          initial={{ opacity: 0, x: "0%" }}
          animate={{
            opacity: 1,
            x: "-50%"
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5
            }
          }}
          style={{
            width: "200%",
            display: "flex",
          }}
        >
          {/* Primeira instância da imagem */}
          <img
            src="/brand-logos/logo-strip.png"
            alt="Brand Logos"
            className="h-24 w-auto object-contain brightness-0 invert"
            style={{ 
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
          {/* Segunda instância para loop contínuo */}
          <img
            src="/brand-logos/logo-strip.png"
            alt="Brand Logos"
            className="h-24 w-auto object-contain brightness-0 invert"
            style={{ 
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;
