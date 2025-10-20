export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}
