import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_categories (
            name,
            slug
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover_image,
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": "Catedral Transportes"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Catedral Transportes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://catedraltransportes.com.br/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Catedral Transportes</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="og:url" content={`https://catedraltransportes.com.br/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.cover_image && <meta name="twitter:image" content={post.cover_image} />}
        <link rel="canonical" href={`https://catedraltransportes.com.br/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            {" > "}
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            {post.blog_categories && (
              <>
                {" > "}
                <span>{post.blog_categories.name}</span>
              </>
            )}
            {" > "}
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o blog
            </Button>
          </Link>

          {/* Cover Image */}
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            {post.blog_categories && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {post.blog_categories.name}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views_count} visualizações
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-primary/5 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              Precisa transportar seu veículo?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e solicite um orçamento sem compromisso
            </p>
            <Link to="/#contato">
              <Button size="lg">
                Solicitar Orçamento
              </Button>
            </Link>
          </div>
        </article>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default BlogPost;
