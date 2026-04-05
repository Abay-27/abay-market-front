import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

interface CategorySectionProps {
  onSelect: (cat: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Shop by Category</h2>
            <p className="text-neutral-500">Explore our wide range of Ethiopian and global products</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-orange-600 font-bold hover:underline transition-all"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelect(cat.name)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all border border-neutral-100"
            >
              <div className="h-40 relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-neutral-800 group-hover:text-orange-600 transition-colors">{cat.name}</h3>
                <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-bold">Explore</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};