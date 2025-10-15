import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", searchQuery, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          blog_categories (
            name,
            slug
          )
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Blog - Catedral Transportes | Dicas e Informações sobre Transporte de Veículos</title>
        <meta 
          name="description" 
          content="Fique por dentro de tudo sobre transporte de veículos. Dicas, documentação, segurança e muito mais no blog da Catedral Transportes."
        />
        <meta property="og:title" content="Blog - Catedral Transportes" />
        <meta property="og:description" content="Dicas e informações sobre transporte de veículos" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://catedraltransportes.com.br/blog" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog da Catedral Transportes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dicas, informações e tudo sobre transporte de veículos
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Carregando posts...</p>
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="grid gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum post encontrado</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <BlogSidebar
              categories={categories || []}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Blog;
