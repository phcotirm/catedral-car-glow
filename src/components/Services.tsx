import { Truck, Shield, Clock, MapPin, Award, HeadphonesIcon } from "lucide-react";
import { Card } from "./ui/card";

const services = [
  {
    icon: Truck,
    title: "Transporte Especializado",
    description: "Veículos leves e pesados transportados com total segurança e cuidado em todo o território nacional",
  },
  {
    icon: Shield,
    title: "Seguro Completo",
    description: "Cobertura total durante todo o transporte. Seu veículo protegido do início ao fim da jornada",
  },
  {
    icon: Clock,
    title: "Entregas Pontuais",
    description: "Cumprimento rigoroso de prazos com rastreamento em tempo real para sua tranquilidade",
  },
  {
    icon: MapPin,
    title: "Cobertura Nacional",
    description: "Rede de parceiros confiáveis em todos os estados, garantindo atendimento onde você precisar",
  },
  {
    icon: Award,
    title: "Registro ANTT",
    description: "Empresa regularizada e certificada pela ANTT, garantindo conformidade e profissionalismo",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Dedicado",
    description: "Equipe especializada disponível para atender suas necessidades com agilidade e atenção",
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Serviços de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Excelência</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Soluções completas em transporte de veículos com a qualidade que você merece
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-2 p-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
