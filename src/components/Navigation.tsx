import { useState, useEffect } from "react";
import sealclubLogo from "@/assets/sealclub-logo.png";
import { Button } from "./ui/button";
import { ButtonHard } from "./ui/button-hard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100; // Offset to account for the fixed header
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "O Que É", href: "#features", onClick: () => scrollToSection('features') },
    { name: "Marcas", href: "#logo-carousel", onClick: () => scrollToSection('logo-carousel') },
    { name: "Planos", href: "#pricing", onClick: () => scrollToSection('pricing') },
    { name: "Regras", href: "#footer", onClick: () => scrollToSection('footer') },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled 
          ? "h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl" 
          : "h-14 bg-[#1B1B1B] w-[95%] max-w-3xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <img src={sealclubLogo} alt="SealClub" className="w-8 h-8" />
            <span className="text-base text-muted-foreground font-bold">SealClub</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {/* Mobile: Dropdown Menu */}
            <div className="md:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-[#1B1B1B] border-white/10 z-[60]"
                  sideOffset={8}
                >
                  {navItems.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      onClick={() => {
                        item.onClick();
                        setIsMenuOpen(false);
                      }}
                      className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-white/5"
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator className="bg-white/10" />
                  
                  <DropdownMenuItem
                    onClick={() => {
                      scrollToSection('cta');
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer font-semibold text-primary hover:bg-primary/10"
                  >
                    Já sou membro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop: Links diretos */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              
              <ButtonHard 
                onClick={() => scrollToSection('cta')}
                className="text-sm"
              >
                Já sou membro
              </ButtonHard>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;