import { VercelRequest, VercelResponse } from '@vercel/node';

// Place ID da Catedral Transporte de Veículos
const PLACE_ID = 'ChIJa3vP-sC1wZMR5jR2XpXg_yU';

// API Key (should be stored in environment variables in production)
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAnqXV7EjxwZM-GtLybRTcOLruhh--kqKw';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch place details from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_API_KEY}&fields=name,rating,user_ratings_total,reviews`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API status: ${data.status}`);
    }

    const place = data.result;

    // Extract and format reviews
    const reviews = (place.reviews || []).map((review: any) => ({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.relative_time_description,
      profile_photo_url: review.profile_photo_url,
    }));

    // Return formatted data
    res.status(200).json({
      name: place.name,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      reviews: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

