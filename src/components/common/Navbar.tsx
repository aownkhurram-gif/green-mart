import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Phone,
  Tag,
  LogOut,
  Package,
  Settings,
  Sparkles,
  Check,
} from 'lucide-react';
import { PageView } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    cartSubtotal,
    wishlist,
    currentUser,
    logout,
    isAdmin,
    toggleAdminMode,
    products,
    openProductDetail,
    setSelectedCategory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Instant Search Matches
  const searchMatches = searchInput.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchInput.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setShowSearchDropdown(false);
      setCurrentView('shop');
    }
  };

  const navCategories = [
    { slug: 'all', name: 'All Categories' },
    { slug: 'electronics', name: 'Electronics' },
    { slug: 'fashion', name: 'Fashion' },
    { slug: 'home', name: 'Home & Living' },
    { slug: 'groceries', name: 'Groceries' },
    { slug: 'beauty', name: 'Beauty & Care' },
    { slug: 'sports', name: 'Sports' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#16A34A] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium overflow-hidden whitespace-nowrap">
            <span className="bg-white/20 text-white text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full">
              ARTISTIC SALE
            </span>
            <span className="truncate">
              Free Express Shipping on orders over $50! Use code <strong className="underline text-green-100">GREEN20</strong> for 20% OFF
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-green-100 text-xs shrink-0">
            <a href="tel:+18005550199" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+1 (800) 555-0199</span>
            </a>
            <button
              onClick={() => setCurrentView('faq')}
              className="hover:text-white transition-colors font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className="hover:text-white transition-colors font-medium"
            >
              Contact
            </button>
            {/* Quick Admin Switch */}
            <button
              onClick={toggleAdminMode}
              className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-3 py-0.5 rounded-full font-bold transition-colors text-[11px]"
              title="Toggle Admin Dashboard view"
            >
              <Settings className="w-3 h-3" />
              <span>{isAdmin ? 'Exit Admin' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Search Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo in Artistic Serif style */}
        <div
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#16A34A] to-[#22C55E] flex items-center justify-center text-white shadow-md shadow-green-600/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gray-900">GreenMart</span>
              <span className="text-2xl sm:text-3xl font-serif font-black text-[#16A34A]">.</span>
            </div>
            <span className="text-[10px] font-semibold text-green-700 tracking-wider uppercase block -mt-1">
              Artistic & Sustainable
            </span>
          </div>
        </div>

        {/* Live Search Bar with Pill shape */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search 1,000+ items (Headphones, Sneakers, Avocados)..."
              className="w-full bg-[#F0FDF4] border border-green-200/80 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#16A34A] focus:bg-white focus:ring-2 focus:ring-green-100 transition-all shadow-xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full transition-colors shadow-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {showSearchDropdown && searchInput.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="p-2 text-xs font-semibold text-gray-400 bg-gray-50 border-b border-gray-100 flex justify-between">
                <span>Matching Products</span>
                <span>{searchMatches.length} found</span>
              </div>

              {searchMatches.length > 0 ? (
                <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                  {searchMatches.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        openProductDetail(product.id);
                        setShowSearchDropdown(false);
                        setSearchInput('');
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-emerald-50/60 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                          <span className="capitalize text-emerald-600 font-medium">
                            {product.category}
                          </span>
                          <span>•</span>
                          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setShowSearchDropdown(false);
                      setCurrentView('shop');
                    }}
                    className="w-full text-center py-2.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    View All Results in Shop →
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-gray-500">
                  No products found for "{searchInput}". Try another keyword.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wishlist */}
          <button
            onClick={() => setCurrentView('account')}
            className="relative p-2.5 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-xl transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Toggle / Button */}
          <button
            onClick={() => setCurrentView('cart')}
            className="flex items-center gap-2.5 bg-green-50 hover:bg-green-100/80 text-green-900 px-3.5 py-2 rounded-full transition-all font-semibold text-xs border border-green-200/80 shadow-xs"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#16A34A]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#16A34A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-[10px] text-green-700 block -mb-0.5 uppercase tracking-wider font-bold">
                My Cart
              </span>
              <span className="text-xs font-black text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>
          </button>

          {/* User Account Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 p-1.5 text-gray-700 hover:text-[#16A34A] hover:bg-green-50 rounded-full transition-colors"
              aria-label="User Account Menu"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center border border-green-200">
                {currentUser ? currentUser.name.charAt(0) : <User className="w-4 h-4" />}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block pr-1" />
            </button>

            {userDropdownOpen && (
              <div
                onClick={() => setUserDropdownOpen(false)}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-green-100 p-2 z-50"
              >
                {currentUser ? (
                  <>
                    <div className="p-2.5 bg-green-50/60 rounded-xl mb-2">
                      <p className="text-xs font-bold text-gray-900">{currentUser.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-green-800 bg-green-200/60 px-2 py-0.5 rounded-full uppercase">
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentView('account')}
                      className="w-full flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-[#16A34A] hover:bg-green-50 p-2 rounded-xl transition-colors text-left"
                    >
                      <Package className="w-4 h-4 text-[#16A34A]" />
                      My Orders & Profile
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => setCurrentView('admin')}
                        className="w-full flex items-center gap-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 p-2 rounded-xl transition-colors text-left"
                      >
                        <Settings className="w-4 h-4 text-purple-600" />
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 text-xs font-medium text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors text-left mt-1 border-t border-gray-100 pt-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="p-2 space-y-2">
                    <p className="text-xs text-gray-500 mb-2">Sign in to track orders and manage wishlist.</p>
                    <button
                      onClick={() => setCurrentView('account')}
                      className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold text-xs py-2 rounded-full transition-colors"
                    >
                      Log In / Sign Up
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-green-50 rounded-full"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Bar */}
      <nav className="bg-white/80 border-t border-green-100 hidden md:block py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {navCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setCurrentView('shop');
                }}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                  currentView === 'shop' && cat.slug === 'all'
                    ? 'text-[#16A34A] bg-green-100/80 font-bold shadow-2xs'
                    : 'text-gray-700 hover:text-[#16A34A] hover:bg-green-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Secondary links */}
          <div className="flex items-center gap-5 text-xs font-medium text-gray-600">
            <button
              onClick={() => setCurrentView('about')}
              className={`hover:text-[#16A34A] transition-colors ${
                currentView === 'about' ? 'text-[#16A34A] font-bold' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`hover:text-[#16A34A] transition-colors ${
                currentView === 'contact' ? 'text-[#16A34A] font-bold' : ''
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setCurrentView('privacy')}
              className={`hover:text-[#16A34A] transition-colors ${
                currentView === 'privacy' ? 'text-[#16A34A] font-bold' : ''
              }`}
            >
              Policies
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-emerald-600"
            />
            <button type="submit" className="absolute right-2 top-2 text-emerald-600" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setCurrentView('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs font-semibold p-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-gray-700"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 text-xs font-semibold text-gray-700">
            <button
              onClick={() => {
                setCurrentView('account');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-emerald-600 font-bold"
            >
              My Account & Orders
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1"
            >
              About GreenMart
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1"
            >
              Contact Support
            </button>
            <button
              onClick={() => {
                toggleAdminMode();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-purple-600 font-bold"
            >
              {isAdmin ? 'Exit Admin Mode' : 'Go to Admin Dashboard'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
