import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface Order {
  id: number;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [logoClicks, setLogoClicks] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([
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
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'Иван Петров',
      items: [{ product: products[0], quantity: 2 }],
      total: 2580,
      status: 'pending',
      date: '19.10.2024'
    },
    {
      id: 2,
      customerName: 'Мария Сидорова',
      items: [{ product: products[1], quantity: 1 }],
      total: 1490,
      status: 'pending',
      date: '18.10.2024'
    }
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: ''
  });

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    
    if (newCount === 7) {
      setIsAdminMode(true);
      toast({
        title: "Режим администратора активирован",
        description: "Добро пожаловать в админ-панель",
      });
    }
  };

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

  const deleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Товар удален",
      description: "Товар успешно удален из каталога",
    });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      category: newProduct.category || 'Новинка',
      description: newProduct.description,
      reviews: []
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: 0, image: '', category: '', description: '' });
    toast({
      title: "Товар добавлен",
      description: "Новый товар успешно добавлен в каталог",
    });
  };

  const updateOrderStatus = (orderId: number, status: 'accepted' | 'rejected') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
    toast({
      title: status === 'accepted' ? "Заказ принят" : "Заказ отклонен",
      description: `Заказ #${orderId} ${status === 'accepted' ? 'принят в работу' : 'отклонен'}`,
    });
  };

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShieldCheck" size={24} />
              <h1 className="text-2xl font-bold">Админ-панель</h1>
            </div>
            <Button variant="outline" onClick={() => { setIsAdminMode(false); setLogoClicks(0); }}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="orders">Заказы ({orders.filter(o => o.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="products">Товары ({products.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Список заказов</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Товары</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>
                            {order.items.map(item => (
                              <div key={item.product.id} className="text-sm">
                                {item.product.name} x{item.quantity}
                              </div>
                            ))}
                          </TableCell>
                          <TableCell className="font-semibold">{order.total} ₽</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                              order.status === 'accepted' ? 'default' :
                              order.status === 'rejected' ? 'destructive' : 'secondary'
                            }>
                              {order.status === 'pending' ? 'Ожидает' : 
                               order.status === 'accepted' ? 'Принят' : 'Отклонен'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {order.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateOrderStatus(order.id, 'accepted')}>
                                  <Icon name="Check" size={14} />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, 'rejected')}>
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Добавить новый товар</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Название</Label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Название браслета"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Цена (₽)</Label>
                      <Input
                        type="number"
                        value={newProduct.price || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL изображения</Label>
                      <Input
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Категория</Label>
                      <Input
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        placeholder="Новинка"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Описание</Label>
                      <Textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Описание товара..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button className="mt-4" onClick={addProduct}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить товар
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Список товаров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                      <Card key={product.id} className="overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                          <p className="font-bold mb-3">{product.price} ₽</p>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Icon name="Trash2" size={14} className="mr-2" />
                            Удалить
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center">
              <Icon name="Gem" className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold">Дом Браслетов</h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-black">
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
                              className="w-20 h-20 object-cover rounded"
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
                        <span className="text-2xl">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full bg-black hover:bg-gray-800 text-white" size="lg">
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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Уникальные браслеты<br />ручной работы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Каждое изделие создается с вниманием к деталям и может быть адаптировано под ваши предпочтения
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
            <Icon name="Palette" size={20} className="mr-2" />
            Заказать индивидуальный дизайн
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Dialog key={product.id} onOpenChange={(open) => open && setSelectedProduct(product)}>
              <Card 
                className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DialogTrigger asChild>
                  <div>
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
                </DialogTrigger>
                <CardContent className="px-6 pb-6">
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white"
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
                        className="w-full rounded"
                      />
                      <div className="space-y-3">
                        <Badge className="bg-black">{selectedProduct.category}</Badge>
                        <p className="text-lg leading-relaxed">{selectedProduct.description}</p>
                        <div className="flex items-center justify-between py-6 border-t border-b">
                          <span className="text-3xl font-bold">{selectedProduct.price} ₽</span>
                          <Button
                            size="lg"
                            className="bg-black hover:bg-gray-800 text-white"
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
                            onClick={submitReview}
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
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <section className="bg-black text-white rounded p-12 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Индивидуальный заказ</h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Создайте уникальный браслет по вашим параметрам. Выбор материалов, цветов и элементов декора.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
            <Icon name="Wand2" size={20} className="mr-2" />
            Начать индивидуальный заказ
          </Button>
        </section>
      </main>

      <footer className="bg-gray-50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">О нас</h4>
              <p className="text-sm text-muted-foreground">
                Создаем уникальные браслеты ручной работы с 2020 года. Каждое изделие - произведение искусства.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <p className="text-sm text-muted-foreground">Email: info@dombraсletov.ru</p>
              <p className="text-sm text-muted-foreground">Телефон: +7 (999) 123-45-67</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-8">
            © 2024 Дом Браслетов. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
