import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../common/ProductCard';
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  Search,
  Filter,
  Star,
  Check,
  RotateCcw,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [discountOnly, setDiscountOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'
  >('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchCat && !matchTags) return false;
        }

        // Price Range
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }

        // Min Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Stock filter
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        // Discount filter
        if (discountOnly && (!p.discount || p.discount <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default order
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    minRating,
    inStockOnly,
    discountOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 500]);
    setMinRating(0);
    setInStockOnly(false);
    setDiscountOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    minRating > 0 ||
    inStockOnly ||
    discountOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-green-100">
        <div>
          <span className="text-xs font-black text-[#16A34A] uppercase tracking-widest block mb-1">
            Curated Catalog
          </span>
          <h1 className="text-3xl font-serif font-bold text-gray-900">GreenMart Collection</h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> premium items
          </p>
        </div>

        {/* Top Controls: Search box + View Switcher + Sort */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search bar inside shop */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in store..."
              className="w-full bg-[#F0FDF4] border border-green-200/80 rounded-full py-2.5 pl-10 pr-4 text-xs text-gray-900 focus:outline-none focus:border-[#16A34A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-green-200 text-gray-800 text-xs font-bold rounded-full px-4 py-2.5 focus:outline-none focus:border-[#16A34A]"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Layout Toggle */}
          <div className="flex items-center bg-[#F0FDF4] p-1 rounded-full border border-green-200/80">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-[#16A34A] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap bg-[#F0FDF4] p-3.5 rounded-full border border-green-200/80">
          <span className="text-xs font-black text-green-900 shrink-0 ml-2">Active Filters:</span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 text-xs bg-white text-green-900 px-3 py-1 rounded-full border border-green-200 font-bold shadow-xs">
              Category: {selectedCategory}
              <X
                className="w-3.5 h-3.5 cursor-pointer text-gray-400 hover:text-red-500"
                onClick={() => setSelectedCategory('all')}
              />
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 text-xs bg-white text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              Search: "{searchQuery}"
              <X
                className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <span className="inline-flex items-center gap-1 text-xs bg-white text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              Price: ${priceRange[0]} - ${priceRange[1]}
              <X
                className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                onClick={() => setPriceRange([0, 500])}
              />
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs bg-white text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              Rating: {minRating}★ & above
              <X
                className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                onClick={() => setMinRating(0)}
              />
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-white text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              In Stock Only
              <X
                className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                onClick={() => setInStockOnly(false)}
              />
            </span>
          )}

          {discountOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-white text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              On Discount Only
              <X
                className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                onClick={() => setDiscountOnly(false)}
              />
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              Filter Products
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
              Category
            </h4>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-gray-400">{products.length}</span>
                </button>
              </li>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.slug).length;
                return (
                  <li key={cat.slug}>
                    <button
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === cat.slug
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2. Price Range Slider */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
              Max Price (${priceRange[1]})
            </h4>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>$0</span>
              <span className="font-semibold text-gray-900">${priceRange[1]}</span>
            </div>
          </div>

          {/* 3. Rating Filter */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
              Minimum Rating
            </h4>
            <div className="space-y-1.5">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                  className={`w-full flex items-center gap-2 text-xs p-2 rounded-lg transition-colors ${
                    minRating === stars
                      ? 'bg-emerald-50 border border-emerald-200 font-bold text-emerald-800'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex text-amber-400">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span>& up</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Toggles (In Stock & Discount) */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded-sm"
              />
              In Stock Items Only
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={discountOnly}
                onChange={(e) => setDiscountOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded-sm"
              />
              On Sale / Discount Only
            </label>
          </div>
        </aside>

        {/* Products Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={viewMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Matching Products Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn't find any items matching your selected criteria. Try adjusting your filters or search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Category
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left text-xs p-2 rounded-lg ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left text-xs p-2 rounded-lg ${
                      selectedCategory === cat.slug
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-gray-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
