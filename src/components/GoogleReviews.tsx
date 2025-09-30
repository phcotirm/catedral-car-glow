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
            
            {/* Google Reviews Embed */}
            <div className="w-full min-h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <p className="text-lg text-muted-foreground">
                  Para exibir as avaliações do Google aqui, você precisa:
                </p>
                <ol className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                  <li>1. Acessar <a href="https://search.google.com/local/writereview?placeid=SEU_PLACE_ID" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Review Link Generator</a></li>
                  <li>2. Criar seu widget de avaliações</li>
                  <li>3. Copiar o código do iframe</li>
                  <li>4. Substituir este placeholder pelo iframe</li>
                </ol>
                <p className="text-sm text-muted-foreground/70 pt-4">
                  Ou use ferramentas como <a href="https://www.embedgooglereviews.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EmbedGoogleReviews.com</a> para gerar gratuitamente
                </p>
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