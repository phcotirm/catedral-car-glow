import { CheckCircle2 } from "lucide-react";

export const About = () => {
  const features = [
    "Mais de 20 anos de experiência no mercado",
    "Registro e certificação ANTT",
    "Seguro completo incluso em todos os transportes",
    "Rede de parceiros confiáveis em todo Brasil",
    "Rastreamento em tempo real",
    "Atendimento personalizado 24/7",
  ];

  return (
    <section id="sobre" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experiência e
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Compromisso</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                A Catedral Transportes é referência em logística de veículos, oferecendo soluções completas com responsabilidade e excelência.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa missão é garantir que seu veículo chegue ao destino com total segurança, pontualidade e cuidado, construindo uma relação de confiança com cada cliente.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 group"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground/90 group-hover:text-foreground transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl">🚛</div>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-5xl">🛡️</div>
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl">✅</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
