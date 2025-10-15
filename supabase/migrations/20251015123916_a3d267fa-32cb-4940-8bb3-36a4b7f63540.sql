-- Fix search_path for the trigger function
DROP FUNCTION IF EXISTS public.update_blog_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_updated_at();