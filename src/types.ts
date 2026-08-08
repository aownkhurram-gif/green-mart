export interface Product {
  id: string;
  title: string;
  category: 'electronics' | 'fashion' | 'home' | 'groceries' | 'beauty' | 'sports';
  price: number;
  originalPrice?: number;
  discount?: number; // percentage, e.g. 15
  rating: number; // e.g. 4.8
  reviewCount: number;
  stock: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  tags: string[];
  brand?: string;
  sku?: string;
}

export interface Category {
  id: string;
  slug: 'electronics' | 'fashion' | 'home' | 'groceries' | 'beauty' | 'sports';
  name: string;
  description: string;
  iconName: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'card';

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    accountNumber?: string;
    cardNumberMasked?: string;
  };
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  address?: ShippingAddress;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  description: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'admin'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy';
