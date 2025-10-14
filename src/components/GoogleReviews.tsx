import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

interface Review {
  authorName: string;
  authorPhoto: string | null;
  rating: number;
  text: string;
  relativeTime: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  businessName: string;
  reviews: Review[];
}

export const GoogleReviews = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('fetch-google-reviews');
        
        if (error) throw error;
        
        if (data?.success) {
          setReviewsData(data.data);
        } else {
          throw new Error(data?.error || 'Falha ao carregar avaliações');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Não foi possível carregar as avaliações');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'
        }`}
      />
    ));
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
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-64 rounded-2xl" />
                <Skeleton className="h-64 rounded-2xl" />
                <Skeleton className="h-64 rounded-2xl" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-card rounded-2xl border border-border/50 shadow-card">
              <p className="text-muted-foreground mb-6">{error}</p>
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJVeuml6UzWpMRyEpKXvxGPG0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver Avaliações no Google
              </a>
            </div>
          ) : reviewsData ? (
            <div className="space-y-8 animate-fade-in">
              {/* Header with overall rating */}
              <div className="text-center bg-card p-8 rounded-2xl border border-border/50 shadow-card">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {renderStars(Math.round(reviewsData.rating))}
                  </div>
                  <span className="text-3xl font-bold">{reviewsData.rating.toFixed(1)}</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Baseado em {reviewsData.totalReviews} avaliações no Google
                </p>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewsData.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-2xl border border-border/50 shadow-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {review.authorPhoto ? (
                        <img
                          src={review.authorPhoto}
                          alt={review.authorName}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">
                            {review.authorName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {review.authorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.relativeTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA to see all reviews */}
              <div className="text-center pt-8">
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJVeuml6UzWpMRyEpKXvxGPG0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  <Star className="w-5 h-5" />
                  Ver Todas as Avaliações no Google
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
