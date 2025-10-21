import { Star, MapPin, ExternalLink, Quote, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  profileUrl?: string;
  authorImage?: string;
}

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      author: "Empresa de Logística SP",
      rating: 5,
      text: "Excelente serviço! Transportaram nossos veículos com total segurança. Equipe muito profissional e atenciosa. Recomendo fortemente!",
      date: "há 2 semanas",
      profileUrl: "#"
    },
    {
      author: "João Silva",
      rating: 5,
      text: "Melhor experiência que já tive com transporte de veículos. Chegou no prazo, bem embalado e em perfeitas condições. Voltarei com certeza!",
      date: "há 1 mês",
      profileUrl: "#"
    },
    {
      author: "Maria Santos",
      rating: 5,
      text: "Serviço de qualidade excepcional. Muito obrigada pela dedicação e cuidado com meu veículo. Profissionalismo de ponta!",
      date: "há 1 mês",
      profileUrl: "#"
    }
  ]);

  const [averageRating] = useState(5.0);
  const [totalReviews] = useState(28);

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
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="avaliacoes" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-semibold text-primary">Avaliações Verificadas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            O Que Nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Clientes Dizem</span>
          </h2>
          
          <p className="text-lg text-slate-600 mb-8">
            Avaliações reais de clientes satisfeitos com nossos serviços de transporte
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">{averageRating}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-slate-600">baseado em {totalReviews} avaliações</p>
            </div>
            <div className="w-px h-16 bg-slate-200"></div>
            <div className="text-left">
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-semibold text-slate-900">Google Reviews</span>
              </p>
              <p className="text-xs text-slate-500">
                Avaliações verificadas do Google Meu Negócio
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {review.rating}.0
                </span>
              </div>

              {/* Review Text */}
              <p className="text-slate-700 mb-6 leading-relaxed text-sm line-clamp-4">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-start justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">
                      {review.author}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 pointer-events-none transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Elfsight Widget */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-slate-900">Google Reviews Widget</span>
              </div>
              
              {/* Elfsight Google Reviews Widget */}
              <div className="w-full">
                <div className="elfsight-app-862f9a5f-4a95-4cb2-bca1-ddaefadab7c7" data-elfsight-app-lazy></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-slate-600 mb-6 font-medium">
            Quer deixar sua avaliação? Acesse nosso perfil no Google Maps
          </p>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open('https://www.google.com/maps', '_blank')}
          >
            <MapPin className="w-5 h-5" />
            Ver Mais Avaliações no Google Maps
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

