import { Star } from "lucide-react";
import { useEffect } from "react";

export const GoogleReviews = () => {
  useEffect(() => {
    // Load Elfsight platform script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="avaliacoes" className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Que Nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Clientes Dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Avaliações reais de clientes satisfeitos com nossos serviços
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Google Reviews Widget */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-white p-4 md:p-8 shadow-card animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-2xl font-bold">Google Reviews</span>
            </div>
            
            {/* Elfsight Google Reviews Widget */}
            <div className="w-full">
              <div className="elfsight-app-862f9a5f-4a95-4cb2-bca1-ddaefadab7c7" data-elfsight-app-lazy></div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};