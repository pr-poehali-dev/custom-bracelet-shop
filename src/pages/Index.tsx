import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Product, CartItem, Order } from '@/types';
import AdminPanel from '@/components/AdminPanel';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import ProductDialog from '@/components/ProductDialog';

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
      <AdminPanel
        products={products}
        orders={orders}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        deleteProduct={deleteProduct}
        addProduct={addProduct}
        updateOrderStatus={updateOrderStatus}
        onExit={() => { setIsAdminMode(false); setLogoClicks(0); }}
      />
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
                <ShoppingCart
                  cart={cart}
                  totalPrice={totalPrice}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
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
              <DialogTrigger asChild>
                <div>
                  <ProductCard
                    product={product}
                    index={index}
                    onAddToCart={addToCart}
                    onOpenDialog={setSelectedProduct}
                  />
                </div>
              </DialogTrigger>
              {selectedProduct && (
                <ProductDialog
                  product={selectedProduct}
                  newReview={newReview}
                  setNewReview={setNewReview}
                  onAddToCart={addToCart}
                  onSubmitReview={submitReview}
                />
              )}
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
