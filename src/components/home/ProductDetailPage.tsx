import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  ArrowLeft, 
  Truck, 
  RotateCcw, 
  CheckCircle2,
  Package,
  Globe,
  Share2,
  Heart
} from 'lucide-react';
import { products } from '../../lib/data';
import { useCart } from '../../context/CartContext';
import { Layout } from '../layout/Layout';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <Layout onSearch={(q) => navigate(`/?q=${q}`)} onCategorySelect={() => navigate('/')} cartCount={cartCount}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-black mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/')}>Back to Shop</Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error("Could not copy link. Please copy the URL from your browser.");
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout 
      onSearch={(q) => navigate(`/?q=${q}`)} 
      onCategorySelect={(c) => navigate(c ? `/category/${c.toLowerCase()}` : '/')} 
      cartCount={cartCount}
    >
      <div className="bg-neutral-50 min-h-screen pb-20">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-500 hover:text-orange-600 transition-colors font-bold uppercase text-[10px] tracking-widest mb-8"
          >
            <ArrowLeft size={16} /> Back to results
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-2xl shadow-neutral-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white rounded-2xl border border-neutral-100 overflow-hidden cursor-pointer hover:border-orange-600 transition-all">
                    <img src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-2 flex items-center gap-4">
                <span className="text-orange-600 font-black uppercase tracking-[0.2em] text-xs">{product.category}</span>
                <div className="h-1 w-1 bg-neutral-300 rounded-full"></div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black text-neutral-900">{product.rating}</span>
                  <span className="text-neutral-400 font-medium ml-1">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tighter leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <div className="text-4xl font-black text-orange-600 tracking-tighter">
                  {product.price.toLocaleString()} <span className="text-lg font-bold text-neutral-400 tracking-normal">ETB</span>
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  In Stock
                </div>
              </div>

              <p className="text-neutral-600 text-lg leading-relaxed mb-10 font-medium">
                {product.description}
                <br /><br />
                Our products are sourced directly from verified producers across Ethiopia, ensuring authentic quality and fair trade practices. Each purchase supports local enterprises and the Ethiopian economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  onClick={handleAddToCart}
                  className="h-16 flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-orange-600/30 gap-3 border-none"
                >
                  <ShoppingCart size={24} /> Add to Cart
                </Button>
                <div className="flex gap-4">
                  <button className="w-16 h-16 bg-white border border-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm">
                    <Heart size={24} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-16 h-16 bg-white border border-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-orange-600 hover:border-orange-100 hover:bg-orange-50 transition-all shadow-sm"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <div className="p-4 bg-white rounded-2xl border border-neutral-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-900 uppercase">Fast Delivery</p>
                    <p className="text-[10px] text-neutral-500 font-medium">3-5 business days</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-neutral-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-900 uppercase">Verified Auth</p>
                    <p className="text-[10px] text-neutral-500 font-medium">100% Genuine product</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <h2 className="text-3xl font-black text-neutral-900 mb-10 tracking-tight">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                   <Link key={p.id} to={`/product/${p.id}`} className="group">
                      <div className="aspect-square bg-white rounded-[2rem] border border-neutral-100 overflow-hidden mb-4">
                         <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <h4 className="font-black text-neutral-900 group-hover:text-orange-600 transition-colors">{p.name}</h4>
                      <p className="text-orange-600 font-black tracking-tight">{p.price.toLocaleString()} ETB</p>
                   </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};