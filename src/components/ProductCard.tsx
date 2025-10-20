import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onOpenDialog: (product: Product) => void;
}

const ProductCard = ({ product, index, onAddToCart, onOpenDialog }: ProductCardProps) => {
  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div onClick={() => onOpenDialog(product)}>
        <div className="relative overflow-hidden aspect-square bg-gray-50">
          <Badge className="absolute top-4 right-4 z-10 bg-black">
            {product.category}
          </Badge>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className="fill-accent text-accent" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">({product.reviews.length})</span>
          </div>
          <p className="text-2xl font-bold mb-4">{product.price} ₽</p>
        </CardContent>
      </div>
      <CardContent className="px-6 pb-6">
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
