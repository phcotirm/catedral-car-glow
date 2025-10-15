import logoVertical from "@/assets/logo-vertical.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src={logoVertical} 
              alt="Catedral Transportes" 
              className="h-24 w-auto"
            />
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transporte de veículos com segurança, experiência e confiança. 
            Registro ANTT e seguro completo incluso.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <a href="#servicos" className="hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#sobre" className="hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          <div className="pt-6 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Catedral Transportes. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              <a 
                href="https://www.transportedeveiculos.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Portal Transporte de Veículos
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
