import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    const placeId = 'ChIJVeuml6UzWpMRyEpKXvxGPG0';

    if (!apiKey) {
      throw new Error('Google Places API Key not configured');
    }

    console.log('Fetching Google Places details for:', placeId);

    // Fetch place details using Google Places API (New)
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&languageCode=pt-BR`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API Error:', response.status, errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Place data received:', {
      rating: data.rating,
      totalReviews: data.userRatingCount,
      reviewsCount: data.reviews?.length
    });

    // Format reviews
    const formattedReviews = (data.reviews || []).slice(0, 5).map((review: any) => ({
      authorName: review.authorAttribution?.displayName || 'Usuário do Google',
      authorPhoto: review.authorAttribution?.photoUri || null,
      rating: review.rating || 5,
      text: review.text?.text || review.originalText?.text || '',
      relativeTime: review.relativePublishTimeDescription || 'Recente',
    }));

    const result = {
      success: true,
      data: {
        rating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
        businessName: data.displayName?.text || 'Catedral Transportes',
        reviews: formattedReviews,
      },
    };

    console.log('Returning formatted reviews:', formattedReviews.length);

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error in fetch-google-reviews:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
