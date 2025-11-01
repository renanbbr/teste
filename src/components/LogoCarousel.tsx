import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoScales, setLogoScales] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const logos = [
    "/brand-logos/apple-logo.jpg",
    "/brand-logos/playstation-logo.png",
    "/brand-logos/jbl-logo.jpg",
    "/brand-logos/garmin-logo.png",
    "/brand-logos/polar-logo.jpg",
    "/brand-logos/motorola-logo.svg",
    "/brand-logos/inow-logo.png",
    "/brand-logos/starlink-logo.png",
    "/brand-logos/xiaomi-logo.jpg",
    "/brand-logos/stanley-logo.png",
    "/brand-logos/amazon-logo.png",
  ];

  // Multiplicadores adicionais para logos específicos
  const manualScaleMultipliers: Record<string, number> = {
    "/brand-logos/polar-logo.jpg": 1.6,
    "/brand-logos/garmin-logo.png": 1.6,
    "/brand-logos/amazon-logo.png": 1.6,
    "/brand-logos/motorola-logo.svg": 1.7,
    "/brand-logos/apple-logo.jpg": 1.7,
    "/brand-logos/inow-logo.png": 1.6,
  };

  const extendedLogos = [...logos, ...logos, ...logos];

  // Calcular área visual e escalas
  const calculateLogoScales = () => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll('img');
    const scales: Record<string, number> = {};
    
    // Encontrar a Starlink como referência
    let starlinkArea = 0;
    images.forEach((img) => {
      if (img.src.includes('starlink-logo')) {
        const rect = img.getBoundingClientRect();
        starlinkArea = rect.width * rect.height;
      }
    });

    if (starlinkArea === 0) return;

    // Calcular escala para cada logo
    images.forEach((img) => {
      const logoPath = logos.find(logo => img.src.includes(logo.split('/').pop()!));
      if (!logoPath || scales[logoPath]) return;

      const rect = img.getBoundingClientRect();
      const currentArea = rect.width * rect.height;
      
      // Fator de escala baseado na raiz quadrada da proporção de áreas
      let scaleFactor = Math.sqrt(starlinkArea / currentArea);
      
      // Aplicar multiplicador manual se existir
      const manualMultiplier = manualScaleMultipliers[logoPath] || 1;
      scaleFactor *= manualMultiplier;
      
      // Limitar entre 0.8x e 2.0x para evitar distorções extremas
      scales[logoPath] = Math.min(Math.max(scaleFactor, 0.8), 2.0);
    });

    setLogoScales(scales);
    setIsCalculated(true);
  };

  // Calcular escalas após carregamento das imagens
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateLogoScales();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Recalcular ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      setIsCalculated(false);
      setTimeout(calculateLogoScales, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black/50 backdrop-blur-sm py-12 mt-20">
      <motion.div 
        ref={containerRef}
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
        {extendedLogos.map((logo, index) => {
          const scale = logoScales[logo] || 1;
          
          return (
            <motion.img
              key={`logo-${index}`}
              src={logo}
              alt={`Partner logo ${index + 1}`}
              className={`h-16 object-contain transition-transform duration-300 ${
                logo.includes('inow-logo') ? 'mix-blend-multiply' : ''
              }`}
              data-scale={scale}
              initial={{ opacity: 0.5 }}
              animate={{
                scale: isCalculated ? scale : 1
              }}
              whileHover={{ 
                opacity: 1,
                scale: isCalculated ? scale * 1.05 : 1.05,
                transition: { duration: 0.2 }
              }}
              style={{
                transformOrigin: 'center center'
              }}
              onError={(e) => {
                console.error(`Failed to load logo: ${logo}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;