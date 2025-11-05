import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-16 mt-20 bg-gradient-to-b from-[#0A0A1A] to-black">
      <div className="container px-4">
        <div className="border-t border-white/15 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Coluna 1 - Sobre o SealClub */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg bg-gradient-to-r from-[#0D6EFD] to-[#60A5FA] bg-clip-text text-transparent">
                SealClub
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-['Helvetica_Neue',sans-serif]">
                O primeiro clube de compras inteligente do Brasil.<br/>
                Acesso a Apple e marcas premium com preço de custo.
              </p>
              <div className="flex space-x-3 pt-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-[#0D6EFD]/10 hover:text-[#0D6EFD] transition-colors"
                  asChild
                >
                  <a href="https://instagram.com/sealclub" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-[#0D6EFD]/10 hover:text-[#0D6EFD] transition-colors"
                  asChild
                >
                  <a href="https://wa.me/53991963971" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Coluna 2 - O Clube */}
            <div className="space-y-4">
              <h4 className="font-semibold bg-gradient-to-r from-[#0D6EFD] to-[#60A5FA] bg-clip-text text-transparent">
                O Clube
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a 
                    href="#features" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    O que é o SealClub
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Planos e Benefícios
                  </a>
                </li>
                <li>
                  <a 
                    href="#sealpass" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Parcerias SealPass
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Programa de Indicação
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Recursos */}
            <div className="space-y-4">
              <h4 className="font-semibold bg-gradient-to-r from-[#0D6EFD] to-[#60A5FA] bg-clip-text text-transparent">
                Recursos
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a 
                    href="#features" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/53991963971" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <span className="text-sm text-white/50 font-['Helvetica_Neue',sans-serif]">
                    Blog <span className="text-xs">(em breve)</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold bg-gradient-to-r from-[#0D6EFD] to-[#60A5FA] bg-clip-text text-transparent">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-[#0D6EFD] transition-colors font-['Helvetica_Neue',sans-serif]"
                  >
                    Contrato SealClub (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha inferior com copyright */}
          <div className="mt-12 pt-8 border-t border-white/15">
            <p className="text-center text-white/60 text-xs md:text-sm font-['Helvetica_Neue',sans-serif] leading-relaxed">
              © 2025 SealClub. Todos os direitos reservados.<br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              Powered by Seal Store Group.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
