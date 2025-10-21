import { Star, MapPin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  profileUrl?: string;
}

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      author: "Cliente Satisfeito",
      rating: 5,
      text: "Excelente serviço! A equipe foi muito profissional e atenciosa. Recomendo!",
      date: "há 2 semanas",
      profileUrl: "#"
    },
    {
      author: "João Silva",
      rating: 5,
      text: "Melhor experiência que já tive. Voltarei com certeza!",
      date: "há 1 mês",
      profileUrl: "#"
    },
    {
      author: "Maria Santos",
      rating: 5,
      text: "Serviço de qualidade excepcional. Muito obrigada!",
      date: "há 1 mês",
      profileUrl: "#"
    }
  ]);

  useEffect(() => {
    // Load Elfsight platform script with defer for better performance
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-primary text-primary"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

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

        <div className="max-w-6xl mx-auto">
          {/* Google Reviews Widget via Elfsight */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-white p-4 md:p-8 shadow-card animate-fade-in mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
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

          {/* Additional Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/50 bg-white p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{review.author}</h3>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  "{review.text}"
                </p>

                {review.profileUrl && (
                  <a
                    href={review.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2"
                  >
                    Ver no Google <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => window.open('https://www.google.com/maps', '_blank')}
            >
              <MapPin className="w-4 h-4" />
              Ver Mais Avaliações no Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

