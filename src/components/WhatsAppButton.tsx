import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const WhatsAppButton = () => {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 p-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 animate-pulse"
      asChild
    >
      <a
        href="https://wa.me/5561981715793?text=Olá%2C+gostaria+de+solicitar+uma+cotação+de+transporte+de+veículo."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </Button>
  );
};
