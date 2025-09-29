import { Mail, Phone, Instagram, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

export const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(61) 98171-5793",
      href: "https://wa.me/5561981715793?text=Olá%2C+gostaria+de+solicitar+uma+cotação+de+transporte+de+veículo.",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "catedraltransportedeveiculos@gmail.com",
      href: "mailto:catedraltransportedeveiculos@gmail.com",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@catedraltransportes",
      href: "https://instagram.com/catedraltransportes",
    },
  ];

  return (
    <section id="contato" className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solicite sua
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Cotação</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Entre em contato e receba um orçamento personalizado para o transporte do seu veículo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group"
              >
                <a 
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4"
                >
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                    <div className="font-semibold group-hover:text-primary transition-colors">{info.value}</div>
                  </div>
                </a>
              </Card>
            ))}

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Horário de Atendimento</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 14h</p>
                <p className="text-primary font-semibold pt-2">WhatsApp 24/7</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50">
            <form 
              action="https://formsubmit.co/catedraltransportedeveiculos@gmail.com" 
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value="Nova solicitação de cotação - Site" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="space-y-2">
                <label className="text-sm font-medium">Nome completo</label>
                <Input 
                  name="nome"
                  placeholder="Seu nome"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <Input 
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input 
                  type="tel"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Detalhes do transporte</label>
                <Textarea 
                  name="mensagem"
                  placeholder="Descreva o veículo, origem, destino e outras informações relevantes..."
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all text-lg py-6"
              >
                <Send className="mr-2" />
                Enviar Solicitação
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
