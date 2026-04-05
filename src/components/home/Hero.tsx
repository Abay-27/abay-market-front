import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Truck, User, Store, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar (Hidden on mobile) */}
          <div className="hidden lg:block bg-white border border-neutral-100 rounded-xl p-4 shadow-sm">
            <h3 className="font-black text-neutral-900 mb-4 px-2 uppercase text-[10px] tracking-widest">Top Categories</h3>
            <ul className="space-y-1">
              {[
                { name: "Agriculture", label: "Agricultural Products" },
                { name: "Coffee", label: "Coffee & Spices" },
                { name: "Traditional wear", label: "Apparel & Textiles" },
                { name: "Electronics", label: "Electronics" },
                { name: "Home & Office", label: "Home Appliances" },
                { name: "Logistics", label: "Logistics & Cargo" }
              ].map((cat) => (
                <li 
                  key={cat.name} 
                  onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
                  className="px-3 py-2.5 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all cursor-pointer text-sm font-bold text-neutral-600 flex items-center justify-between group"
                >
                  {cat.label}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
            <div className="mt-6 px-2">
               <Button 
                variant="ghost"
                onClick={() => navigate('/')}
                className="w-full py-2 bg-neutral-50 text-neutral-900 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
               >
                 View All Categories
               </Button>
            </div>
          </div>

          {/* Main Hero Banner */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] group shadow-2xl"
            >
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/hero-banner-ec07d9fd-1775227856520.webp" 
                alt="Work_Abay Mart Ethiopia" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-center p-8 md:p-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 bg-orange-600 text-white text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-[2px] shadow-lg"
                >
                  <Zap size={10} className="fill-white" />
                  Global Trade Starts Here
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1] tracking-tighter"
                >
                  Ethiopia's Leading <br />
                  <span className="text-orange-500">Digital</span> Marketplace
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-neutral-300 text-sm md:text-lg mb-8 max-w-md font-medium"
                >
                  Connect with verified suppliers across Ethiopia. Quality products, secure payments, global reach.
                </motion.p>
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    asChild
                    size="lg"
                    className="h-14 px-10 bg-orange-600 text-white rounded-xl font-black hover:bg-orange-700 transition-all flex items-center gap-2 shadow-2xl shadow-orange-600/30 border-none cursor-pointer"
                  >
                    <Link to="/category/coffee">
                      Source Now <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-10 bg-white/10 backdrop-blur-md text-white border-white/20 rounded-xl font-black hover:bg-white/20 transition-all border-2 cursor-pointer"
                  >
                    <Link to="/become-a-seller">
                      Sell on Mart
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-6">
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex-1 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Truck className="text-orange-600" size={24} />
                </div>
                <h4 className="font-black text-neutral-900 text-lg mb-2 tracking-tight">Ready to Ship</h4>
                <p className="text-sm text-neutral-600 font-medium">Fast delivery from local warehouses directly to your door.</p>
              </div>
              <Button 
                variant="link"
                onClick={() => navigate('/category/agriculture')}
                className="text-orange-600 font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 p-0 h-fit cursor-pointer"
              >
                View Catalog <ArrowRight size={14} />
              </Button>
            </div>
            
            <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 flex-1 flex flex-col justify-between shadow-xl hover:shadow-orange-900/10 transition-all group">
              <div>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/10">
                  <Store className="text-orange-500" size={24} />
                </div>
                <h4 className="font-black text-white text-lg mb-2 tracking-tight">Become a Seller</h4>
                <p className="text-sm text-neutral-400 font-medium">Join 10k+ verified Ethiopian producers scaling their business.</p>
              </div>
              <Button 
                variant="link"
                asChild
                className="text-orange-500 font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 p-0 h-fit cursor-pointer"
              >
                <Link to="/become-a-seller">
                  Start Selling Now <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Verified Suppliers', value: '10k+', icon: <ShieldCheck size={20} className="text-orange-600"/> },
            { label: 'Product Categories', value: '25+', icon: <Zap size={20} className="text-orange-600"/> },
            { label: 'Active Buyers', value: '1M+', icon: <User size={20} className="text-orange-600"/> },
            { label: 'Global Shipping', value: '45+', icon: <Globe size={20} className="text-orange-600"/> },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-neutral-100 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-black text-neutral-900 leading-none">{stat.value}</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-black mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};