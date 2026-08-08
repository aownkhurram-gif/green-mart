import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../common/ProductCard';
import {
  User as UserIcon,
  Package,
  Heart,
  LogOut,
  Settings,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
} from 'lucide-react';

export const UserAccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    logout,
    signup,
    updateProfile,
    orders,
    wishlist,
    products,
    setCurrentView,
    toggleAdminMode,
    isAdmin,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('orders');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address?.address || '');
  const [editCity, setEditCity] = useState(currentUser?.address?.city || '');

  const userOrders = orders.filter(
    (o) => o.userId === currentUser?.id || o.customerEmail === currentUser?.email
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim()) {
      login(loginEmail.trim());
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupName.trim() && signupEmail.trim()) {
      signup(signupName.trim(), signupEmail.trim());
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      address: {
        fullName: editName,
        phone: editPhone,
        email: currentUser?.email || '',
        address: editAddress,
        city: editCity,
        postalCode: '54000',
      },
    });
  };

  // If NOT logged in, show Auth Screen
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <UserIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              {authMode === 'login' ? 'Welcome Back!' : 'Create GreenMart Account'}
            </h2>
            <p className="text-xs text-gray-500">
              {authMode === 'login'
                ? 'Sign in to access your order history and saved wishlist.'
                : 'Join GreenMart for instant checkout and special discounts.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                authMode === 'login' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                authMode === 'signup' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500'
              }`}
            >
              Create Account
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. khurram@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  defaultValue="123456"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Khurram Shehzad"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="e.g. khurram@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Quick Demo Logins for instant evaluation */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-center">
            <span className="text-[11px] font-semibold text-gray-400 block">Quick Demo Logins:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => login('khurram@example.com', 'customer')}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold py-2 rounded-xl transition-colors"
              >
                Demo Customer
              </button>

              <button
                onClick={() => login('admin@greenmart.com', 'admin')}
                className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold py-2 rounded-xl transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Account Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{currentUser.name}</h1>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setCurrentView('admin')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              Admin Dashboard
            </button>
          )}

          <button
            onClick={logout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Package className="w-4 h-4" />
          My Orders ({userOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          My Saved Wishlist ({wishlistProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          Profile Settings
        </button>
      </div>

      {/* Tab 1: Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length > 0 ? (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                  <div>
                    <span className="font-extrabold text-gray-900 text-sm">Order #{order.id}</span>
                    <span className="text-gray-400 block mt-0.5">Placed on: {order.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-xs uppercase ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <span className="font-extrabold text-sm text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="divide-y divide-gray-50">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-10 h-10 object-cover rounded-lg bg-gray-50"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{item.product.title}</h4>
                          <span className="text-gray-500">
                            Quantity: {item.quantity} x ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Payment: <strong className="capitalize text-emerald-700">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                  <span>Est. Delivery: {order.estimatedDelivery}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-3">
              <Package className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-gray-900">No Orders Placed Yet</h3>
              <p className="text-xs text-gray-500">Your order history will appear here once you make a purchase.</p>
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
              >
                Browse Store Products
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist Grid */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-gray-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-gray-500">Click the heart icon on any product to save it for later.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Settings Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
            Edit Account Information
          </h3>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Default Address</label>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">City</label>
            <input
              type="text"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      )}
    </div>
  );
};
