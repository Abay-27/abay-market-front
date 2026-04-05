import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { CategorySection } from './components/home/CategorySection';
import { ProductGrid } from './components/home/ProductGrid';
import { Toaster } from './components/ui/sonner';
import { products } from './lib/data';
import { AnimatePresence, motion } from 'framer-motion';
import { BecomeSellerPage } from './components/seller/BecomeSellerPage';
import { SellerRegistrationPage } from './components/seller/SellerRegistrationPage';
import { CartProvider, useCart } from './context/CartContext';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { ProductDetailPage } from './components/home/ProductDetailPage';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardPage } from './components/admin/DashboardPage';
import { ProductManagement } from './components/admin/ProductManagement';
import { OrderManagement } from './components/admin/OrderManagement';
import { UserManagement } from './components/admin/UserManagement';

const StoreFront = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();
  
  const { addToCart, cartCount } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryId ? p.category.toLowerCase() === categoryId.toLowerCase() : true;
    const matchesSearch = searchQuery ? (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const handleCategorySelect = (cat: string | null) => {
    if (cat) {
      navigate(`/category/${cat.toLowerCase()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Layout 
        cartCount={cartCount}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      >
        <AnimatePresence mode="wait">
          {!searchQuery && !categoryId && (
            <motion.div
              key="hero-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <CategorySection onSelect={handleCategorySelect} />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter">
                {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Marketplace` : searchQuery ? `Results for "${searchQuery}"` : 'Featured Collection'}
              </h2>
              <p className="text-neutral-500 mt-2">Verified quality from trusted Ethiopian producers.</p>
            </div>
            {(categoryId || searchQuery) && (
              <button 
                onClick={() => navigate('/')}
                className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 hover:text-orange-700 transition-colors border-2 border-orange-100 rounded-full px-6 py-2.5 bg-orange-50/50"
              >
                Reset Discovery
              </button>
            )}
          </div>
          
          <ProductGrid 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} 
          />
        </main>
      </Layout>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="/category/:categoryId" element={<StoreFront />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/become-a-seller" element={<BecomeSellerPage />} />
          <Route path="/become-a-seller/register" element={<SellerRegistrationPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" expand={true} richColors />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;