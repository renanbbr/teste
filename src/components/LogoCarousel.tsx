import React from "react";

interface LogoCarouselProps {
  className?: string;
}

const brands = [
  { src: "/brand-logos/apple-logo-new.png", alt: "Apple" },
  { src: "/brand-logos/dji-logo-new.png", alt: "DJI" },
  { src: "/brand-logos/motorola-logo-new.png", alt: "Motorola" },
  { src: "/brand-logos/jbl-logo-new.png", alt: "JBL" },
  { src: "/brand-logos/garmin-logo-new.png", alt: "Garmin" },
  { src: "/brand-logos/playstation-logo-new.png", alt: "PlayStation" },
  { src: "/brand-logos/polar-logo-new.png", alt: "Polar" },
  { src: "/brand-logos/hollyland-logo-new.png", alt: "Hollyland" },
  { src: "/brand-logos/inow-logo-new.png", alt: "Inow" },
  { src: "/brand-logos/coswheel-logo.png", alt: "Coswheel" },
  { src: "/brand-logos/starlink-logo.png", alt: "Starlink" },
  { src: "/brand-logos/stanley-logo.png", alt: "Stanley" },
];

const LogoCarousel = ({ className }: LogoCarouselProps) => {
  return (
    <div className="w-full bg-black/50 py-12 overflow-hidden">
      <div className="relative flex">
        {/* Sombra esquerda - fade in */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Sombra direita - fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Primeira instância - movimento contínuo */}
        <div className="animate-marquee flex min-w-full shrink-0 items-center gap-8 px-4">
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 h-16 w-32 flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-full w-auto object-contain"
                style={{
                  filter: 'saturate(0) invert(1) brightness(1.2)',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Segunda instância - loop contínuo */}
        <div className="animate-marquee flex min-w-full shrink-0 items-center gap-8 px-4">
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 h-16 w-32 flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-full w-auto object-contain"
                style={{
                  filter: 'saturate(0) invert(1) brightness(1.2)',
                  imageRendering: 'crisp-edges',
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
