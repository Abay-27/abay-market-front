import React from 'react';
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus, Package, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Layout } from '../layout/Layout';
import { Button } from '../ui/button';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  const handleCategorySelect = (cat: string | null) => {
    if (cat) {
      navigate(`/category/${cat.toLowerCase()}`);
    } else {
      navigate('/');
    }
  };

  if (cart.length === 0) {
    return (
      <Layout onSearch={handleSearch} onCategorySelect={handleCategorySelect} cartCount={0}>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6"
          >
            <ShoppingCart size={40} className="text-neutral-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Your cart is empty</h2>
          <p className="text-neutral-500 mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our featured products and find great deals!
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-xl font-bold text-lg"
          >
            Start Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onSearch={handleSearch} onCategorySelect={handleCategorySelect} cartCount={cartCount}>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
              <h1 className="text-3xl font-bold text-neutral-900">Shopping Cart</h1>
              <span className="text-neutral-500 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-lg transition-shadow"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1 block">{item.category}</span>
                          <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-neutral-500">
                            <div className="flex items-center gap-1 text-green-600 font-medium">
                              <ShieldCheck size={14} /> In Stock
                            </div>
                            <span>SKU: WA-{item.id.toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-neutral-900 mt-2 md:mt-0">
                          {item.price.toLocaleString()} <span className="text-xs font-bold text-neutral-400">ETB</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-orange-600 hover:bg-white rounded-md transition-all"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold text-neutral-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-orange-600 hover:bg-white rounded-md transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl border-2 border-orange-600/10 p-8 sticky top-32 shadow-xl shadow-orange-600/5">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold text-neutral-900">{totalPrice.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping Fee</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Sales Tax (VAT 15%)</span>
                  <span className="font-bold text-neutral-900">{(totalPrice * 0.15).toLocaleString()} ETB</span>
                </div>
                <div className="h-px bg-neutral-100 my-4"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-neutral-900">Total Amount</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-orange-600">{(totalPrice * 1.15).toLocaleString()}</div>
                    <span className="text-xs font-bold text-neutral-400">ETB (Incl. VAT)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group shadow-lg shadow-orange-600/20"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Link 
                  to="/" 
                  className="flex items-center justify-center text-sm font-bold text-neutral-500 hover:text-orange-600 transition-colors py-2"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Work_Abay Secure</p>
                    <p className="text-xs text-neutral-400">Your payment is 100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Ethiopian Post Delivery</p>
                    <p className="text-xs text-neutral-400">Delivery within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};