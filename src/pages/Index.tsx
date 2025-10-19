import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });

  const products: Product[] = [
    {
      id: 1,
      name: 'Градиент Мечты',
      price: 1290,
      image: 'https://cdn.poehali.dev/projects/88856975-4623-410d-9b87-6ce2f7880b6b/files/064fc769-ac6c-43d3-ad60-57510b83dfe4.jpg',
      category: 'Тренды',
      description: 'Яркий браслет с плавным переходом от фиолетового к розовому. Идеально подходит для создания летнего образа.',
      reviews: [
        { id: 1, author: 'Анна К.', rating: 5, text: 'Очень красивый! Качество отличное, ношу не снимая', date: '15.10.2024' },
        { id: 2, author: 'Мария П.', rating: 5, text: 'Подарила подруге, она в восторге! Цвета живые', date: '12.10.2024' }
      ]
    },
    {
      id: 2,
      name: 'Солнечный Закат',
      price: 1490,
      image: 'https://cdn.poehali.dev/projects/88856975-4623-410d-9b87-6ce2f7880b6b/files/8d1915af-cfb1-4a55-bb33-2440eb872b13.jpg',
      category: 'Бестселлер',
      description: 'Элегантный браслет в теплых оранжево-розовых тонах с изящными подвесками. Ручная работа.',
      reviews: [
        { id: 3, author: 'Елена Р.', rating: 5, text: 'Просто волшебный! Смотрится дорого', date: '10.10.2024' }
      ]
    },
    {
      id: 3,
      name: 'Лавандовый Шарм',
      price: 1390,
      image: 'https://cdn.poehali.dev/projects/88856975-4623-410d-9b87-6ce2f7880b6b/files/8ab5bc22-8bb4-408e-87be-b457c0e81aa9.jpg',
      category: 'Новинка',
      description: 'Нежный браслет с градиентом лавандовых оттенков. Каждая бусина подобрана вручную.',
      reviews: [
        { id: 4, author: 'Ольга В.', rating: 4, text: 'Красивый, но хотелось бы чуть длиннее', date: '08.10.2024' }
      ]
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const submitReview = () => {
    toast({
      title: "Спасибо за отзыв!",
      description: "Ваш отзыв будет опубликован после модерации",
    });
    setNewReview({ rating: 5, text: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BraceletShop
            </h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative border-2 border-purple-300 hover:border-purple-400">
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.product.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.product.price} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center text-lg font-bold mb-4">
                        <span>Итого:</span>
                        <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {totalPrice} ₽
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" size="lg">
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Создай браслет мечты
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Уникальные браслеты ручной работы с возможностью полной кастомизации под ваш стиль
          </p>
          <Button size="lg" className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg">
            <Icon name="Palette" size={20} className="mr-2" />
            Создать свой дизайн
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Dialog key={product.id} onOpenChange={(open) => open && setSelectedProduct(product)}>
              <Card 
                className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fade-in border-2 border-purple-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DialogTrigger asChild>
                  <div>
                    <div className="relative overflow-hidden aspect-square">
                      <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                        {product.category}
                      </Badge>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-orange-400 text-orange-400" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">({product.reviews.length})</span>
                      </div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        {product.price} ₽
                      </p>
                    </CardContent>
                  </div>
                </DialogTrigger>
                <CardContent className="p-6 pt-0">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>

              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProduct?.name}</DialogTitle>
                </DialogHeader>
                
                {selectedProduct && (
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Описание</TabsTrigger>
                      <TabsTrigger value="reviews">Отзывы ({selectedProduct.reviews.length})</TabsTrigger>
                      <TabsTrigger value="contact">Связаться</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="space-y-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                          {selectedProduct.category}
                        </Badge>
                        <p className="text-lg">{selectedProduct.description}</p>
                        <div className="flex items-center justify-between py-4 border-t border-b">
                          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {selectedProduct.price} ₽
                          </span>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            onClick={() => addToCart(selectedProduct)}
                          >
                            <Icon name="ShoppingCart" size={20} className="mr-2" />
                            Добавить в корзину
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-4">
                      <div className="space-y-4">
                        {selectedProduct.reviews.map(review => (
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
                                        className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-sm">{review.text}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <Card className="bg-purple-50 border-purple-200">
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
                                    className={rating <= newReview.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}
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
                            onClick={submitReview}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            Отправить отзыв
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-4">
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
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
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                              <Icon name="Send" size={18} className="mr-2" />
                              Отправить сообщение
                            </Button>
                          </div>
                          
                          <div className="pt-4 border-t space-y-2">
                            <h5 className="font-semibold mb-3">Или напишите напрямую:</h5>
                            <Button variant="outline" className="w-full justify-start" size="lg">
                              <Icon name="MessageCircle" size={20} className="mr-2" />
                              Telegram: @braceletshop
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="lg">
                              <Icon name="Instagram" size={20} className="mr-2" />
                              Instagram: @braceletshop
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="lg">
                              <Icon name="Mail" size={20} className="mr-2" />
                              Email: shop@bracelet.ru
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <section className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-12 text-white text-center">
          <h3 className="text-4xl font-bold mb-4">Не нашли подходящий дизайн?</h3>
          <p className="text-xl mb-8 opacity-90">Создайте уникальный браслет по своим параметрам</p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            <Icon name="Wand2" size={20} className="mr-2" />
            Заказать кастомный браслет
          </Button>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-200 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 BraceletShop. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
