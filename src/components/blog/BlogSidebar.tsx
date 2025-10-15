import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const BlogSidebar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: BlogSidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectCategory(null)}
          >
            Todas
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">
            Precisa de ajuda?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Entre em contato e solicite um orçamento personalizado
          </p>
          <Button className="w-full" asChild>
            <a href="/#contato">
              Falar com especialista
            </a>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};
