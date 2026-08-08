import React from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from './RatingStars';
import { Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    cart,
  } = useShop();

  const isLiked = isInWishlist(product.id);
  const inCartItem = cart.find((item) => item.product.id === product.id);
  const isOutOfStock = product.stock <= 0;

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center group">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-gray-50 shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              -{product.discount}%
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md backdrop-blur-md transition-colors ${
              isLiked
                ? 'bg-red-50 text-red-500'
                : 'bg-white/80 text-gray-600 hover:text-red-500'
            }`}
            title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>
            {product.isBestSeller && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          <h3
            onClick={() => openProductDetail(product.id)}
            className="text-base font-semibold text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>

          <div className="mt-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>

          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isOutOfStock
                    ? 'text-red-500'
                    : product.stock <= 5
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : product.stock <= 5
                  ? `Only ${product.stock} left!`
                  : 'In Stock'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuickViewProduct(product)}
                className="p-2 text-gray-600 hover:text-emerald-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product, 1)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                  isOutOfStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
                }`}
              >
                {inCartItem ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {inCartItem ? `In Cart (${inCartItem.quantity})` : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[32px] sm:rounded-[36px] border border-green-100/90 overflow-hidden shadow-xl shadow-green-900/5 hover:shadow-2xl hover:shadow-green-900/10 transition-all flex flex-col h-full group relative p-4 sm:p-5"
    >
      {/* Top Badges */}
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discount && (
            <span className="bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              -{product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2.5 rounded-full shadow-md backdrop-blur-md transition-all transform hover:scale-110 ${
            isLiked
              ? 'bg-red-50 text-red-500'
              : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
          }`}
          title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Container */}
      <div
        onClick={() => openProductDetail(product.id)}
        className="relative w-full h-48 sm:h-52 bg-gradient-to-tr from-green-50/50 to-emerald-50/30 rounded-[24px] overflow-hidden cursor-pointer flex items-center justify-center p-2"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-[#16A34A] hover:text-white transition-all transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Body */}
      <div className="pt-4 flex flex-col flex-1">
        <div className="text-[11px] font-extrabold text-[#16A34A] uppercase tracking-widest mb-1">
          {product.category}
        </div>

        <h3
          onClick={() => openProductDetail(product.id)}
          className="text-base font-bold text-gray-900 hover:text-[#16A34A] transition-colors line-clamp-2 mb-2 cursor-pointer flex-1"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="mb-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Stock & Price */}
        <div className="mt-auto pt-3 border-t border-green-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-semibold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] font-semibold ${
                isOutOfStock
                  ? 'text-red-500'
                  : product.stock <= 5
                  ? 'text-amber-600'
                  : 'text-green-700'
              }`}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : product.stock <= 5
                ? `Only ${product.stock} left`
                : 'In Stock'}
            </span>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product, 1)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold transition-all shadow-xs ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : inCartItem
                ? 'bg-green-800 text-white hover:bg-green-900'
                : 'bg-[#16A34A] hover:bg-green-700 text-white hover:shadow-md'
            }`}
          >
            {inCartItem ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {isOutOfStock ? 'Out of Stock' : inCartItem ? `In Cart (${inCartItem.quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
