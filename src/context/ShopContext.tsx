import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  User,
  Coupon,
  ToastMessage,
  PageView,
  Review,
  PaymentMethod,
  ShippingAddress,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  AVAILABLE_COUPONS,
  INITIAL_REVIEWS,
} from '../data/mockData';

interface ShopContextType {
  // Navigation
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Products
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  appliedCoupon: Coupon | null;
  couponDiscountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  signup: (name: string, email: string) => void;
  updateProfile: (updated: Partial<User>) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod,
    paymentDetails?: { accountNumber?: string; cardNumberMasked?: string }
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Admin Quick Access
  isAdmin: boolean;
  toggleAdminMode: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'greenmart_products_v1',
  CART: 'greenmart_cart_v1',
  WISHLIST: 'greenmart_wishlist_v1',
  USER: 'greenmart_user_v1',
  ORDERS: 'greenmart_orders_v1',
  COUPON: 'greenmart_coupon_v1',
  REVIEWS: 'greenmart_reviews_v1',
};

const DEFAULT_DEMO_USER: User = {
  id: 'usr-101',
  name: 'Khurram Shehzad',
  email: 'khurram@example.com',
  phone: '+92 300 1234567',
  role: 'customer',
  address: {
    fullName: 'Khurram Shehzad',
    phone: '+92 300 1234567',
    email: 'khurram@example.com',
    address: 'House 42, Block C, Model Town',
    city: 'Lahore',
    postalCode: '54000',
    notes: 'Please call upon arrival',
  },
  createdAt: '2026-01-15',
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const categories = INITIAL_CATEGORIES;

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      // Sample default initial order for demo user
      return [
        {
          id: 'GM-89412',
          userId: 'usr-101',
          customerName: 'Khurram Shehzad',
          customerEmail: 'khurram@example.com',
          items: [
            {
              product: INITIAL_PRODUCTS[0],
              quantity: 1,
            },
          ],
          subtotal: 349.99,
          discountAmount: 20.00,
          shippingFee: 0,
          totalAmount: 329.99,
          couponCode: 'GREEN20',
          shippingAddress: DEFAULT_DEMO_USER.address!,
          paymentMethod: 'jazzcash',
          paymentDetails: { accountNumber: '03001234567' },
          paymentStatus: 'Paid',
          orderStatus: 'Processing',
          createdAt: '2026-08-06 14:30',
          estimatedDelivery: '2026-08-09',
        },
      ];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Toast Helper
  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Product Detail
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product CRUD
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now().toString(36)}`;
    const newProd: Product = { ...newProdData, id };
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product Created', `"${newProd.title}" added to inventory.`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Product Updated', 'Changes saved successfully.');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Deleted', prod ? `Removed "${prod.title}".` : 'Product removed.');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Inventory Reset', 'Restored default demo products.');
  };

  // Cart Functions
  const addToCart = (
    product: Product,
    quantity: number = 1,
    options?: { color?: string; size?: string }
  ) => {
    if (product.stock <= 0) {
      showToast('Out of Stock', 'This item is currently out of stock.', 'error');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const maxQty = Math.min(newQty, product.stock);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: maxQty,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: Math.min(quantity, product.stock),
            selectedColor: options?.color,
            selectedSize: options?.size,
          },
        ];
      }
    });

    showToast(
      'Added to Cart!',
      `${quantity}x "${product.title.slice(0, 30)}..." in your cart.`,
      'success'
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item Removed', 'Removed item from shopping cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 50;
  const shippingFee = cartSubtotal > freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.0;

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (cartSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Minimum order amount for ${found.code} is $${found.minPurchase}.`,
      };
    }

    setAppliedCoupon(found);
    showToast('Coupon Applied!', `${found.code} - ${found.description}`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Coupon has been detached.', 'info');
  };

  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscountAmount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      couponDiscountAmount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscountAmount + shippingFee);

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);

    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', product ? `"${product.title.slice(0, 25)}..."` : '');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to Wishlist!', product ? `"${product.title.slice(0, 25)}..."` : '');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Auth Functions
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const name = email.split('@')[0];
    const user: User = {
      id: `usr-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      role,
      address: currentUser?.address || DEFAULT_DEMO_USER.address,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(user);
    showToast('Welcome Back!', `Logged in as ${user.name} (${user.role.toUpperCase()})`);
  };

  const signup = (name: string, email: string) => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(user);
    showToast('Account Created!', `Welcome to GreenMart, ${name}!`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
    showToast('Profile Updated', 'Your details have been saved.');
  };

  // Orders
  const placeOrder = (
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod,
    paymentDetails?: { accountNumber?: string; cardNumberMasked?: string }
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `GM-${randomNum}`;

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateStr = estDate.toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      userId: currentUser ? currentUser.id : 'guest-user',
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount: couponDiscountAmount,
      shippingFee,
      totalAmount: cartTotal,
      couponCode: appliedCoupon?.code,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      estimatedDelivery: dateStr,
    };

    // Reduce product stock
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((ci) => ci.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('Order Placed Successfully!', `Order ID: ${newOrder.id}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast('Order Status Updated', `Order #${orderId} marked as ${status}.`);
  };

  // Reviews
  const addReview = (newRevData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate average rating for product
    const productRevs = [...reviews.filter((r) => r.productId === newRevData.productId), newRev];
    const avgRating = Number(
      (productRevs.reduce((acc, r) => acc + r.rating, 0) / productRevs.length).toFixed(1)
    );

    setProducts((prev) =>
      prev.map((p) =>
        p.id === newRevData.productId
          ? { ...p, rating: avgRating, reviewCount: productRevs.length }
          : p
      )
    );

    showToast('Review Submitted', 'Thank you for your valuable feedback!');
  };

  const isAdmin = currentUser?.role === 'admin';

  const toggleAdminMode = () => {
    if (isAdmin) {
      login(currentUser?.email || 'customer@greenmart.com', 'customer');
      setCurrentView('home');
    } else {
      login('admin@greenmart.com', 'admin');
      setCurrentView('admin');
    }
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        appliedCoupon,
        couponDiscountAmount,
        applyCoupon,
        removeCoupon,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        login,
        logout,
        signup,
        updateProfile,
        orders,
        placeOrder,
        updateOrderStatus,
        reviews,
        addReview,
        toasts,
        showToast,
        removeToast,
        isAdmin,
        toggleAdminMode,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
