import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';
import {
  DollarSign,
  Package,
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Search,
  X,
  Check,
  BarChart3,
  Users,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    orders,
    updateOrderStatus,
    categories,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('electronics');
  const [newPrice, setNewPrice] = useState('99.99');
  const [newOriginalPrice, setNewOriginalPrice] = useState('129.99');
  const [newStock, setNewStock] = useState('20');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800');
  const [newDesc, setNewDesc] = useState('');

  // Editing inline state
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<string>('');
  const [editStockVal, setEditStockVal] = useState<string>('');

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const price = parseFloat(newPrice) || 0;
    const origPrice = parseFloat(newOriginalPrice) || undefined;
    const discount = origPrice && origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : undefined;

    addProduct({
      title: newTitle.trim(),
      category: newCategory,
      price,
      originalPrice: origPrice,
      discount,
      stock: parseInt(newStock) || 10,
      image: newImage.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800',
      galleryImages: [newImage.trim()],
      description: newDesc.trim() || 'High quality product available at GreenMart store.',
      rating: 5.0,
      reviewCount: 1,
      features: ['High durability', '1 Year Warranty', 'Official Certified'],
      specs: { 'Brand': 'GreenMart Select', 'Condition': 'Brand New' },
      tags: [newCategory, 'new-arrival'],
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const startEditProduct = (prod: Product) => {
    setEditingProdId(prod.id);
    setEditPriceVal(prod.price.toString());
    setEditStockVal(prod.stock.toString());
  };

  const saveEditProduct = (id: string) => {
    updateProduct(id, {
      price: parseFloat(editPriceVal) || 0,
      stock: parseInt(editStockVal) || 0,
    });
    setEditingProdId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-gray-900">GreenMart Admin Portal</h1>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
              ADMIN CONTROL
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Manage inventory, prices, stock levels, and customer orders</p>
        </div>

        <button
          onClick={resetProductsToDefault}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-emerald-600 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Inventory
        </button>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Total Revenue</span>
            <h3 className="text-xl font-black text-gray-900">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Total Orders</span>
            <h3 className="text-xl font-black text-gray-900">{totalOrdersCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Total Items</span>
            <h3 className="text-xl font-black text-gray-900">{totalProductsCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Low Stock Alert</span>
            <h3 className="text-xl font-black text-amber-700">{lowStockCount}</h3>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Package className="w-4 h-4" />
          Product Inventory ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* Tab 1: Product Inventory Table */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title or category..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-emerald-600"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price ($)</th>
                  <th className="p-4">Stock Qty</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => {
                  const isEditing = editingProdId === p.id;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded-xl bg-gray-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-900 line-clamp-1">{p.title}</h4>
                            <span className="text-[10px] text-gray-400">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="capitalize font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-gray-900">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editPriceVal}
                            onChange={(e) => setEditPriceVal(e.target.value)}
                            className="w-20 bg-gray-50 border border-emerald-500 rounded-lg p-1 text-xs"
                          />
                        ) : (
                          `$${p.price.toFixed(2)}`
                        )}
                      </td>

                      <td className="p-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editStockVal}
                            onChange={(e) => setEditStockVal(e.target.value)}
                            className="w-16 bg-gray-50 border border-emerald-500 rounded-lg p-1 text-xs"
                          />
                        ) : (
                          <span
                            className={`font-semibold ${
                              p.stock <= 5 ? 'text-amber-600 font-bold' : 'text-gray-800'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        {isEditing ? (
                          <button
                            onClick={() => saveEditProduct(p.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 text-gray-600 hover:text-emerald-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                            title="Edit Price/Stock"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Payment Info</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Change Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4 font-bold text-gray-900">
                    #{o.id}
                    <span className="text-[10px] text-gray-400 block font-normal">{o.createdAt}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-gray-900 block">{o.customerName}</span>
                    <span className="text-[11px] text-gray-500">{o.shippingAddress.city} • {o.shippingAddress.phone}</span>
                  </td>

                  <td className="p-4">
                    <span className="capitalize font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                      {o.paymentMethod}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{o.paymentStatus}</span>
                  </td>

                  <td className="p-4 font-black text-gray-900">
                    ${o.totalAmount.toFixed(2)}
                  </td>

                  <td className="p-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Add New Product to GreenMart</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Wireless Ergonomic Gaming Mouse"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600 capitalize"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Sale Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Product key highlights & details..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-colors"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
