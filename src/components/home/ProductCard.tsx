import React from 'react';
import { Star, ShoppingCart, Heart, ShieldCheck, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart();
    toast.success("Added to Cart", {
      description: `${product.name} is now in your shopping cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Saved to Wishlist", {
      description: "We'll notify you if this item goes on sale!",
      icon: <Heart className="text-red-500 fill-red-500" size={16} />
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] border border-neutral-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full relative"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-neutral-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isTrending && (
            <div className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              Hot Item
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-md text-neutral-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-neutral-200">
            Verified
          </div>
        </div>

        {/* Action Buttons - More accessible on mobile */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 md:translate-x-12 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleWishlist}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-neutral-600 hover:bg-orange-600 hover:text-white transition-all shadow-xl"
          >
            <Heart size={18} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); toast.info("Quick View coming soon"); }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all shadow-xl"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Add to Cart - Always visible on mobile, hover only on desktop */}
        <div className="absolute inset-x-4 bottom-4 md:translate-y-20 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <button 
             onClick={handleAddToCart}
             className="w-full py-3 md:py-4 bg-orange-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors shadow-2xl shadow-orange-600/40 text-sm"
           >
             <ShoppingCart size={18} />
             Add to Cart
           </button>
        </div>
      </Link>

      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">{product.category}</span>
          <div className="flex items-center text-amber-400 gap-1">
            <Star size={12} fill="currentColor" />
            <span className="text-xs text-neutral-900 font-black">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-black text-neutral-900 text-lg md:text-xl mb-1 md:mb-2 line-clamp-1 tracking-tight group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs md:text-sm text-neutral-500 line-clamp-2 mb-4 md:mb-6 flex-1 font-medium leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 md:pt-6 border-t border-neutral-50 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Price (ETB)</p>
            <span className="text-xl md:text-2xl font-black text-neutral-900 tracking-tighter">{product.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-green-600 font-black bg-green-50 px-3 py-1.5 rounded-full shadow-sm">
            <ShieldCheck size={12} className="shrink-0" />
            AUTHENTIC
          </div>
        </div>
      </div>
    </motion.div>
  );
};