import { Star } from "lucide-react";

export const GoogleReviews = () => {
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
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-8 shadow-card animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-2xl font-bold">Google Reviews</span>
            </div>
            
            {/* Google Reviews Display */}
            <div className="w-full space-y-6">
              {/* Link to view reviews on Google */}
              <div className="text-center">
                <a 
                  href="https://search.google.com/local/reviews?placeid=ChIJVeuml6UzWpMRyEpKXvxGPG0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Ver Todas as Avaliações no Google
                </a>
              </div>

              {/* Instructions for embedding widget */}
              <div className="text-center space-y-4 pt-6 border-t border-border/50">
                <p className="text-lg text-muted-foreground">
                  Para exibir as avaliações diretamente aqui:
                </p>
                <ol className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                  <li>1. Acesse <a href="https://www.embedsocial.com/products/reviews-widget/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EmbedSocial</a> ou <a href="https://elfsight.com/google-reviews-widget/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Elfsight</a></li>
                  <li>2. Use o Place ID: <code className="bg-secondary/50 px-2 py-1 rounded text-sm">ChIJVeuml6UzWpMRyEpKXvxGPG0</code></li>
                  <li>3. Gere o widget de avaliações</li>
                  <li>4. Copie o código e substitua esta seção</li>
                </ol>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};