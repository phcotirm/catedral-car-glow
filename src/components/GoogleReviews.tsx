import { Star, MapPin, ExternalLink, Quote, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: string;
  profile_photo_url?: string;
}

interface ReviewsData {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
}

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [placeName, setPlaceName] = useState("Catedral Transporte de Veículos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PLACE_ID = "ChIJa3vP-sC1wZMR5jR2XpXg_yU";
  const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the backend proxy to fetch reviews securely
        const response = await fetch("/api/getReviews");

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.statusText}`);
        }

        const data: ReviewsData = await response.json();

        setPlaceName(data.name);
        setAverageRating(data.rating);
        setTotalReviews(data.user_ratings_total);
        
        // Limit to 5 reviews for display
        setReviews(data.reviews.slice(0, 5));
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err.message : "Failed to load reviews");
        
        // Fallback to empty reviews on error
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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
          {!loading && (
            <div className="flex items-center justify-center gap-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">{averageRating.toFixed(1)}</div>
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
          )}

          {loading && (
            <div className="flex justify-center items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <span className="ml-2">Carregando avaliações...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              <p className="font-semibold">Erro ao carregar avaliações</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {!loading && reviews.length > 0 && (
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
                    {review.profile_photo_url ? (
                      <img 
                        src={review.profile_photo_url} 
                        alt={review.author_name} 
                        className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className={`${!review.profile_photo_url ? 'w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white flex-shrink-0' : ''}`}>
                      {!review.profile_photo_url && <User className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-slate-900 text-sm truncate">
                        {review.author_name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {review.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 pointer-events-none transition-all duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-slate-600 mb-6 font-medium">
            Quer deixar sua avaliação? Acesse nosso perfil no Google Maps
          </p>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
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

