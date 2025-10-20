import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Product } from '@/types';

interface ProductDialogProps {
  product: Product;
  newReview: { rating: number; text: string; };
  setNewReview: (review: { rating: number; text: string; }) => void;
  onAddToCart: (product: Product) => void;
  onSubmitReview: () => void;
}

const ProductDialog = ({ 
  product, 
  newReview, 
  setNewReview, 
  onAddToCart, 
  onSubmitReview 
}: ProductDialogProps) => {
  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">{product.name}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Описание</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы ({product.reviews.length})</TabsTrigger>
          <TabsTrigger value="contact">Связаться</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded"
          />
          <div className="space-y-3">
            <Badge className="bg-black">{product.category}</Badge>
            <p className="text-lg leading-relaxed">{product.description}</p>
            <div className="flex items-center justify-between py-6 border-t border-b">
              <span className="text-3xl font-bold">{product.price} ₽</span>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white"
                onClick={() => onAddToCart(product)}
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="space-y-4">
            {product.reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review.rating ? "fill-accent text-accent" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-lg">Оставить отзыв</h4>
              <div className="space-y-2">
                <Label>Оценка</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        className={rating <= newReview.rating ? "fill-accent text-accent" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ваш отзыв</Label>
                <Textarea
                  placeholder="Поделитесь впечатлениями о товаре..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  rows={4}
                />
              </div>
              <Button
                onClick={onSubmitReview}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Отправить отзыв
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-lg">Связаться с продавцом</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Ваше имя</Label>
                  <Input placeholder="Введите имя" />
                </div>
                <div className="space-y-2">
                  <Label>Email или телефон</Label>
                  <Input placeholder="Введите контакт" />
                </div>
                <div className="space-y-2">
                  <Label>Сообщение</Label>
                  <Textarea
                    placeholder="Опишите ваши пожелания по кастомизации..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </Button>
              </div>
              
              <div className="pt-4 border-t space-y-2">
                <h5 className="font-semibold mb-3">Или напишите напрямую:</h5>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Telegram: @dombraсletov
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Icon name="Instagram" size={20} className="mr-2" />
                  Instagram: @dombraсletov
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Icon name="Mail" size={20} className="mr-2" />
                  Email: info@dombraсletov.ru
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default ProductDialog;
