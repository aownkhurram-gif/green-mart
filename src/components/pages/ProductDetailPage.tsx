import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from '../common/RatingStars';
import { ProductCard } from '../common/ProductCard';
import {
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  X,
  Star,
  Lock,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    setCurrentView,
    openProductDetail,
    currentUser,
    showToast,
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Review Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>(currentUser?.name || '');

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const galleryList = Array.from(
    new Set([product.image, ...(product.galleryImages || [])])
  );

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview({
      productId: product.id,
      userName: reviewerName.trim() || 'Anonymous Buyer',
      rating: newRating,
      comment: newComment.trim(),
      verifiedPurchase: true,
    });

    setNewComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Product link copied to clipboard.');
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-emerald-600 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <button
          onClick={() => setCurrentView('shop')}
          className="hover:text-emerald-600 transition-colors capitalize"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.title}</span>
      </div>

      {/* Primary 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs">
        {/* Gallery Left */}
        <div className="space-y-4">
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative w-full h-96 sm:h-[420px] rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 cursor-zoom-in group"
          >
            <img
              src={activeImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                -{product.discount}% OFF
              </span>
            )}
            <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view full image
            </span>
          </div>

          {/* Thumbnails */}
          {galleryList.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                    (activeImage || product.image) === img
                      ? 'border-emerald-600 scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Right */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
                showNumber
              />
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                SKU: <strong className="text-gray-800">{product.sku || 'GM-SKU-901'}</strong>
              </span>
              <span className="text-gray-300">•</span>
              <span
                className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                  isOutOfStock
                    ? 'bg-red-50 text-red-600'
                    : product.stock <= 5
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : product.stock <= 5
                  ? `Only ${product.stock} items left in stock!`
                  : `In Stock (${product.stock} available)`}
              </span>
            </div>

            {/* Pricing Box */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-baseline gap-4">
              <span className="text-3xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                  You save ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features list */}
            {product.features && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Key Highlights
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Controls & Buy Buttons */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-600 hover:text-emerald-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-3 text-gray-600 hover:text-emerald-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors flex items-center gap-2 text-xs font-semibold ${
                  isLiked
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600' : ''}`} />
                {isLiked ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product, quantity)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                disabled={isOutOfStock}
                onClick={() => {
                  addToCart(product, quantity);
                  setCurrentView('checkout');
                }}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                Buy Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-gray-500 text-center">
              <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span>Express Shipping</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span>Cash on Delivery</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                <RotateCcw className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span>7 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section (Description, Specs, Reviews, Shipping) */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 overflow-x-auto gap-4 mb-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'desc'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Detailed Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'specs'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Customer Reviews
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {productReviews.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'shipping'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Shipping & Return Policy
          </button>
        </div>

        {/* Tab Content 1: Description */}
        {activeTab === 'desc' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>{product.description}</p>
            <p>
              At GreenMart, every product is thoroughly inspected to guarantee 100% authenticity, premium quality, and safety. Enjoy peace of mind with our official manufacturer warranty and reliable express delivery straight to your doorstep.
            </p>
          </div>
        )}

        {/* Tab Content 2: Specs Table */}
        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <tbody>
                {product.specs &&
                  Object.entries(product.specs).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-3 px-4 font-bold text-gray-900 border-b border-gray-100 w-1/3">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                        {val}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reviews Summary */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center flex flex-col justify-center items-center space-y-2">
                <span className="text-4xl font-black text-gray-900">{product.rating.toFixed(1)}</span>
                <RatingStars rating={product.rating} size="lg" />
                <span className="text-xs text-gray-500">Based on {product.reviewCount} customer ratings</span>
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-3">
                <h4 className="text-sm font-bold text-gray-900">Write a Customer Review</h4>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Your Rating:</label>
                  <RatingStars rating={newRating} interactive onRate={(r) => setNewRating(r)} size="lg" />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Your Name (e.g. Ahmad Shehzad)..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* List of Reviews */}
            <div className="divide-y divide-gray-100">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                    <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-4">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 4: Shipping Info */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
            <h4 className="font-bold text-gray-900 text-sm">Delivery Timeline & Terms</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard Delivery: 2-3 business days across major cities.</li>
              <li>Express Delivery: Next day delivery available for select areas.</li>
              <li>Free Shipping applied automatically for orders over $50.</li>
              <li>7-day no-questions-asked replacement guarantee for damaged or defective goods.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Full Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/20 hover:bg-white/40"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage || product.image}
            alt={product.title}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
