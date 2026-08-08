import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from './RatingStars';
import { X, Heart, ShoppingCart, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail,
  } = useShop();

  const [selectedImg, setSelectedImg] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const activeImg = selectedImg || quickViewProduct.image;
  const isLiked = isInWishlist(quickViewProduct.id);
  const images = [quickViewProduct.image, ...(quickViewProduct.galleryImages || [])];
  const uniqueImages = Array.from(new Set(images));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery Left */}
            <div>
              <div className="w-full h-72 rounded-xl bg-gray-50 overflow-hidden mb-3 border border-gray-100">
                <img
                  src={activeImg}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover transition-all"
                />
              </div>

              {/* Thumbnails */}
              {uniqueImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {uniqueImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                        activeImg === img
                          ? 'border-emerald-600 scale-95 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Right */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {quickViewProduct.category}
                </span>

                <h2 className="text-xl font-bold text-gray-900 mt-2 mb-1 leading-snug">
                  {quickViewProduct.title}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  <RatingStars
                    rating={quickViewProduct.rating}
                    reviewCount={quickViewProduct.reviewCount}
                    size="sm"
                    showNumber
                  />
                  <span className="text-gray-300">•</span>
                  <span
                    className={`text-xs font-semibold ${
                      quickViewProduct.stock > 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {quickViewProduct.stock > 0
                      ? `In Stock (${quickViewProduct.stock} items)`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {quickViewProduct.discount && (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-md">
                      Save {quickViewProduct.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Features highlights */}
                {quickViewProduct.features && (
                  <ul className="text-xs text-gray-600 space-y-1 mb-4">
                    {quickViewProduct.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-gray-600 hover:text-emerald-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))
                      }
                      className="p-2.5 text-gray-600 hover:text-emerald-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-2.5 border border-gray-200 rounded-xl transition-colors ${
                      isLiked
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                    title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={quickViewProduct.stock <= 0}
                    onClick={() => {
                      addToCart(quickViewProduct, quantity);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      const id = quickViewProduct.id;
                      setQuickViewProduct(null);
                      openProductDetail(id);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-3 py-3 rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-colors"
                  >
                    Full Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
