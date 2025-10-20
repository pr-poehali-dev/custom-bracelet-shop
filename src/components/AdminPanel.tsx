import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product, Order } from '@/types';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  newProduct: {
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
  setNewProduct: (product: { name: string; price: number; image: string; category: string; description: string; }) => void;
  deleteProduct: (productId: number) => void;
  addProduct: () => void;
  updateOrderStatus: (orderId: number, status: 'accepted' | 'rejected') => void;
  onExit: () => void;
}

const AdminPanel = ({
  products,
  orders,
  newProduct,
  setNewProduct,
  deleteProduct,
  addProduct,
  updateOrderStatus,
  onExit
}: AdminPanelProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={24} />
            <h1 className="text-2xl font-bold">Админ-панель</h1>
          </div>
          <Button variant="outline" onClick={onExit}>
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
};

export default AdminPanel;
