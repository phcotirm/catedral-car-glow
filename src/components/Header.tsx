import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import logoHorizontal from "@/assets/logo-header.png";

export const Header = () => {
  const navItems = [
    { label: "Serviços", href: "#servicos" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoHorizontal} 
              alt="Catedral Transportes" 
              className="h-12 md:h-14 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all"
              asChild
            >
              <a 
                href="https://wa.me/5561981715793?text=Olá%2C+gostaria+de+solicitar+uma+cotação+de+transporte+de+veículo."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                <Button 
                  className="bg-gradient-to-r from-primary to-accent w-full"
                  asChild
                >
                  <a 
                    href="https://wa.me/5561981715793?text=Olá%2C+gostaria+de+solicitar+uma+cotação+de+veículo."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
