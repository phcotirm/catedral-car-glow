import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-transport.jpg";
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Transporte de veículos profissional" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Transporte de Veículos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-2">
              com Excelência
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mais de 20 anos de experiência, seguro completo e atendimento personalizado em todo o Brasil
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full" asChild>
              <a href="https://wa.me/5561981715793?text=Olá%2C+gostaria+de+solicitar+uma+cotação+de+transporte+de+veículo." target="_blank" rel="noopener noreferrer">
                Solicitar Cotação
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-secondary/50" asChild>
              <a href="#servicos">
                Nossos Serviços
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">20+</div>
              <div className="text-sm md:text-base text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">100%</div>
              <div className="text-sm md:text-base text-muted-foreground">Seguro Incluso</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">+10</div>
              <div className="text-sm md:text-base text-muted-foreground">          Parceiros em todo Brasil</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        
      </div>
    </section>;
};