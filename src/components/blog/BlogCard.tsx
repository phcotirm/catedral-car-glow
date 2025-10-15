import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    published_at: string;
    views_count: number;
    blog_categories: {
      name: string;
      slug: string;
    } | null;
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.slug}`}>
        {post.cover_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
      </Link>
      
      <CardContent className="pt-6">
        {post.blog_categories && (
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
            {post.blog_categories.name}
          </span>
        )}
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(post.published_at), "dd/MM/yyyy", { locale: ptBR })}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views_count}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ler mais
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
