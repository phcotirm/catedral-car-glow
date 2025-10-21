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
import DOMPurify from "dompurify";

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

  // Sanitize HTML content for security
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'table',
      'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'div', 'span'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel']
  });

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
        <title>{post.meta_title || post.title} | Blog Catedral Transportes</title>
        <meta name="description" content={post.meta_description || post.excerpt || `Leia o artigo completo sobre ${post.title} no blog da Catedral Transportes. Informações e dicas sobre transporte de veículos.`} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || `Leia o artigo completo sobre ${post.title} no blog da Catedral Transportes. Informações e dicas sobre transporte de veículos.`} />
        <meta property="og:type" content="article" />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="og:url" content={`https://catedraltransportes.com.br/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt || `Leia o artigo completo sobre ${post.title} no blog da Catedral Transportes. Informações e dicas sobre transporte de veículos.`} />
        {post.cover_image && <meta name="twitter:image" content={post.cover_image} />}
        <link rel="canonical" href={`https://catedraltransportes.com.br/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        <article className="container mx-auto px-4 py-16 max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            {post.blog_categories && (
              <>
                <span className="mx-2">/</span>
                <span className="text-primary font-medium">{post.blog_categories.name}</span>
              </>
            )}
          </nav>

          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o blog
            </Button>
          </Link>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={"https://files.manuscdn.com/user_upload_by_module/session_file/310419663028341780/pkGCEngzWWcuIzAu.png"}
                alt={post.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  console.error('Failed to load image:', post.cover_image);
                }}
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-12 pb-8 border-b border-slate-200">
            {post.blog_categories && (
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
                {post.blog_categories.name}
              </span>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{post.views_count || 0} visualizações</span>
            </div>
          </div>

          {/* Content - Optimized for Reading */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-slate-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
              prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-3 prose-h2:border-slate-200
              prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-h4:text-xl prose-h4:mt-5 prose-h4:mb-2
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-lg
              prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-em:text-slate-700 prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:my-6
              prose-blockquote:text-gray-800 prose-blockquote:italic
              prose-ul:text-gray-800 prose-ul:space-y-3 prose-ul:mb-6
              prose-ol:text-gray-800 prose-ol:space-y-3 prose-ol:mb-6
              prose-li:text-lg prose-li:leading-relaxed
              prose-code:bg-slate-100 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-th:bg-slate-100 prose-th:text-slate-900 prose-th:font-bold prose-th:p-3 prose-th:text-left
              prose-td:border prose-td:border-slate-200 prose-td:p-3 prose-td:text-gray-800
              prose-hr:border-slate-200 prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Call to Action */}
          <div className="mt-16 p-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl text-center border border-primary/20">
            <h3 className="text-3xl font-bold mb-4 text-slate-900">
              Precisa transportar seu veículo?
            </h3>
            <p className="text-slate-700 mb-8 text-lg leading-relaxed">
              Entre em contato conosco e solicite um orçamento sem compromisso. Nossa equipe está pronta para ajudar!
            </p>
            <Link to="/#contato">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-6 text-lg">
                Solicitar Orçamento
              </Button>
            </Link>
          </div>

          {/* Related Articles Section */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Leia também</h3>
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Voltar para todos os artigos
              <span>→</span>
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

