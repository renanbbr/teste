import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Coluna 1 - Sobre o SealClub */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">SealClub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O primeiro clube de compras inteligente do Brasil.<br />
                Acesso a Apple e as maiores marcas do mundo com preço de fábrica.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'social_click',
                      social_network: 'instagram',
                      button_location: 'footer',
                      click_url: 'https://instagram.com/sealclub',
                      page_url: window.location.href
                    });
                    window.open('https://instagram.com/sealclub', '_blank');
                  }}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'whatsapp_click',
                      button_location: 'footer',
                      click_url: 'https://wa.me/53991963971',
                      page_url: window.location.href
                    });
                    window.open('https://wa.me/53991963971', '_blank');
                  }}
                >
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Coluna 2 - O Clube */}
            <div className="space-y-4">
              <h4 className="font-medium">O Clube</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    O que é o SealClub
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Planos e Benefícios
                  </a>
                </li>
                <li>
                  <a href="#sealpass" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Parcerias SealPass
                  </a>
                </li>
                <li>
                  <a href="#referral" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Programa de Indicação
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Recursos */}
            <div className="space-y-4">
              <h4 className="font-medium">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/53991963971" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({
                        event: 'whatsapp_click',
                        button_location: 'footer_contact',
                        click_url: 'https://wa.me/53991963971',
                        page_url: window.location.href
                      });
                    }}
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Legal */}
            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha inferior com copyright */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-xs text-muted-foreground/60 text-center leading-relaxed" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
              © 2025 SealClub. Todos os direitos reservados.<br />
              Powered by Seal Store Group.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;