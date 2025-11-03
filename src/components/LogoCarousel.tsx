import React from "react";

interface LogoCarouselProps {
  className?: string;
}

const brands = [
  { src: "/brand-logos/apple-logo-new.png", alt: "Apple" },
  { src: "/brand-logos/dji-logo-new.png", alt: "DJI" },
  { src: "/brand-logos/motorola-logo-new.png", alt: "Motorola" },
  { src: "/brand-logos/garmin-logo-new.png", alt: "Garmin" },
  { src: "/brand-logos/playstation-logo-new.png", alt: "PlayStation" },
  { src: "/brand-logos/polar-logo-new.png", alt: "Polar" },
  { src: "/brand-logos/inow-logo-new.png", alt: "Inow" },
  { src: "/brand-logos/xiaomi-logo.png", alt: "Xiaomi" },
  { src: "/brand-logos/xbox-logo.png", alt: "Xbox" },
];

const LogoCarousel = ({ className }: LogoCarouselProps) => {
  return (
    <div className="w-full bg-black/50 py-16 overflow-hidden">
      <div className="relative flex">
        {/* Sombra esquerda - fade in */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Sombra direita - fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Primeira instância - movimento contínuo */}
        <div className="animate-marquee flex min-w-full shrink-0 items-center gap-12 px-4">
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="group flex-shrink-0 w-32 h-10 flex items-center justify-center transition-all duration-300"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                loading="lazy"
                decoding="async"
                className="max-h-10 max-w-[120px] w-auto h-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                style={{
                  filter: 'saturate(0) invert(1) brightness(0.9) contrast(1.1)',
                  mixBlendMode: 'screen',
                  backgroundColor: 'transparent',
                  imageRendering: 'auto',
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Segunda instância - loop contínuo */}
        <div className="animate-marquee flex min-w-full shrink-0 items-center gap-12 px-4">
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="group flex-shrink-0 w-32 h-10 flex items-center justify-center transition-all duration-300"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                loading="lazy"
                decoding="async"
                className="max-h-10 max-w-[120px] w-auto h-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                style={{
                  filter: 'saturate(0) invert(1) brightness(0.9) contrast(1.1)',
                  mixBlendMode: 'screen',
                  backgroundColor: 'transparent',
                  imageRendering: 'auto',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
