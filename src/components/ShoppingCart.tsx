import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CartItem } from '@/types';

interface ShoppingCartProps {
  cart: CartItem[];
  totalPrice: number;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const ShoppingCart = ({ cart, totalPrice, updateQuantity, removeFromCart }: ShoppingCartProps) => {
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Корзина пуста</p>
      </div>
    );
  }

  return (
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
  );
};

export default ShoppingCart;
