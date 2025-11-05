import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-background border-t">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1 - Sobre o SealClub */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">SealClub</h3>
            <p className="text-sm text-muted-foreground">
              O primeiro clube de compras inteligente do Brasil. Acesso a Apple e marcas premium com preço de custo.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com/sealclub" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://wa.me/53991963971" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Coluna 2 - O Clube */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">O Clube</h4>
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
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Programa de Indicação
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Recursos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://wa.me/53991963971" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50">
                  Blog <span className="text-xs">(em breve)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contrato SealClub (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 SealClub. Todos os direitos reservados. Powered by Seal Store Group.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
