export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = 'Super Admin' | 'Admin' | 'Merchant' | 'Customer';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  avatar?: string;
  phone?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'telebirr' | 'cbe-birr' | 'credit-card';
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    subCity: string;
    address: string;
  };
  createdAt: string;
}