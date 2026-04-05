import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart, 
  Globe, 
  MessageSquare, 
  LogOut, 
  X,
  ChevronRight,
  Store,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthModal } from '../auth/AuthModal';
import { categories } from '@/lib/data';
import { Button } from '../ui/button';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  onSearch: (query: string) => void;
  onCategorySelect: (cat: string | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, onSearch, onCategorySelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(logged);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} coming soon!`, {
      description: "Our developers are working hard to bring this feature to Ethiopia.",
    });
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      navigate('/admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast.success("Signed out successfully");
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => {
          setIsAuthModalOpen(false);
          // Check login status again
          const logged = localStorage.getItem('isLoggedIn') === 'true';
          setIsLoggedIn(logged);
        }} 
      />

      {/* Top Bar - Desktop Only */}
      <div className="bg-neutral-900 text-white text-[10px] md:text-[12px] py-2 px-4 border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-orange-500 flex items-center gap-1 transition-colors">
               <Globe size={12} /> Ethiopia (ET)
            </span>
            <span className="hidden sm:inline cursor-pointer hover:text-orange-500 transition-colors uppercase tracking-wider">English - ETB</span>
          </div>
          <div className="flex gap-4">
            <Link to="/become-a-seller" className="text-orange-500 hover:text-orange-400 transition-colors font-black uppercase tracking-wider">Become a Seller</Link>
            <span 
              className="cursor-pointer hover:text-orange-500 transition-colors uppercase tracking-wider hidden md:inline"
              onClick={() => handleComingSoon("Help Center")}
            >
              Help Center
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-neutral-600 hover:text-orange-600 transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20"
              >
                <span className="text-white font-black text-lg md:text-xl">W</span>
              </motion.div>
              <div className="hidden sm:block text-left">
                <h1 className="text-lg md:text-xl font-black text-neutral-900 leading-tight group-hover:text-orange-600 transition-colors tracking-tighter">Work_Abay</h1>
                <p className="text-[8px] md:text-[10px] text-neutral-500 font-bold tracking-widest uppercase">Mart Ethiopia</p>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="flex-1 max-w-2xl relative hidden md:block">
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('search') as HTMLInputElement;
                onSearch(input.value);
              }}>
                <input
                  name="search"
                  type="text"
                  placeholder="Search for coffee, textiles, electronics..."
                  className="w-full pl-6 pr-32 py-3 border-2 border-neutral-100 rounded-full focus:outline-none focus:border-orange-600 text-neutral-700 bg-neutral-50/50 transition-all font-medium"
                  onChange={(e) => {
                    if (e.target.value === '') onSearch('');
                  }}
                />
                <button type="submit" className="absolute right-1 top-1 h-[calc(100%-8px)] px-6 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center gap-2 font-black shadow-lg shadow-orange-600/20">
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
              <button 
                onClick={handleAuthAction}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative">
                  <User className="text-neutral-600 group-hover:text-orange-600 transition-colors" size={24} />
                  {isLoggedIn && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-tighter mt-1">{isLoggedIn ? 'Account' : 'Sign In'}</span>
              </button>
              
              <Link to="/cart" className="flex flex-col items-center cursor-pointer group relative">
                <ShoppingCart className="text-neutral-600 group-hover:text-orange-600 transition-colors" size={24} />
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-tighter mt-1">Cart</span>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg shadow-orange-600/30 border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search - Only on Mobile */}
          <div className="mt-3 md:hidden">
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('search-mobile') as HTMLInputElement;
              onSearch(input.value);
            }} className="relative">
              <input
                name="search-mobile"
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:border-orange-600 text-neutral-700 bg-neutral-50 font-medium text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            </form>
          </div>
        </div>

        {/* Secondary Nav - Desktop Only */}
        <div className="bg-white border-t border-neutral-100 hidden md:block">
          <div className="container mx-auto px-4 py-2.5 flex items-center gap-8">
            <div 
              onClick={() => onCategorySelect(null)}
              className="flex items-center gap-2 cursor-pointer text-neutral-900 hover:text-orange-600 transition-colors group font-black text-sm uppercase tracking-tight"
            >
              <Menu size={18} className="group-hover:rotate-180 transition-transform duration-300" />
              <span>All Categories</span>
            </div>
            <nav className="flex gap-8">
              {[
                { label: 'Home', path: '/' },
                { label: 'Deals', path: '/category/deals' },
                { label: 'Agriculture', path: '/category/agriculture' },
                { label: 'Electronics', path: '/category/electronics' },
                { label: 'Traditional', path: '/category/traditional wear' }
              ].map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  className="text-[11px] text-neutral-500 hover:text-orange-600 transition-colors font-black uppercase tracking-[0.15em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Live Auction: Sidama Coffee</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/40">
                    <span className="text-white font-black text-lg">W</span>
                  </div>
                  <span className="font-black text-xl tracking-tighter">Work_Abay</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-6 mb-8">
                   <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Main Menu</p>
                   <nav className="space-y-4">
                      <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                         Home
                      </Link>
                      <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                         Shopping Cart
                      </Link>
                      <Link to="/become-a-seller" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-orange-600 font-black text-lg">
                         Become a Seller
                      </Link>
                   </nav>
                </div>

                <div className="px-6 mb-8">
                   <div 
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center justify-between cursor-pointer mb-4"
                   >
                     <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Categories</p>
                     <ChevronDown size={14} className={`text-neutral-400 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                   </div>
                   
                   <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {categories.map((cat) => (
                          <div 
                            key={cat.id}
                            onClick={() => {
                              onCategorySelect(cat.name);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between text-neutral-600 font-semibold hover:text-orange-600 transition-colors py-1 pl-2"
                          >
                            {cat.name}
                            <ChevronRight size={14} className="text-neutral-300" />
                          </div>
                        ))}
                      </motion.div>
                    )}
                   </AnimatePresence>
                </div>

                <div className="px-6 pt-8 border-t border-neutral-100">
                   {isLoggedIn ? (
                     <div className="space-y-3">
                        <Button 
                          onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}
                          className="w-full h-12 rounded-xl bg-neutral-900 text-white font-bold gap-2"
                        >
                          <LayoutDashboard size={18} /> Admin Dashboard
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleLogout}
                          className="w-full h-12 rounded-xl text-red-500 border-red-100 font-bold gap-2"
                        >
                          <LogOut size={18} /> Sign Out
                        </Button>
                     </div>
                   ) : (
                    <Button 
                      onClick={() => { handleAuthAction(); setIsMobileMenuOpen(false); }}
                      className="w-full h-12 rounded-xl bg-orange-600 text-white font-bold gap-2 border-none"
                    >
                      <User size={18} /> Sign In / Register
                    </Button>
                   )}
                </div>
              </div>

              <div className="p-6 bg-neutral-50 text-center">
                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-2">Language & Region</p>
                 <div className="flex items-center justify-center gap-4 text-xs font-black text-neutral-900">
                    <span className="flex items-center gap-1"><Globe size={14} /> ET</span>
                    <span>ETB</span>
                    <span>ENGLISH</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 pt-20 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.5)]" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                <span className="text-white font-black text-xl">W</span>
              </div>
              <span className="text-white font-black text-2xl tracking-tighter uppercase text-left">Work_Abay</span>
            </div>
            <p className="text-sm leading-relaxed pr-4 font-medium text-left">
              The first integrated pan-African digital marketplace from Ethiopia. Empowering local producers to reach global markets through technology.
            </p>
            <div className="flex gap-4">
              <button onClick={() => handleComingSoon("Facebook")} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-orange-600 hover:text-white cursor-pointer transition-all">
                <Globe size={18} />
              </button>
              <button onClick={() => handleComingSoon("LinkedIn")} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-orange-600 hover:text-white cursor-pointer transition-all">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Source Now</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li onClick={() => handleComingSoon("RFQ Submission")} className="hover:text-orange-500 cursor-pointer transition-colors">Submit RFQ</li>
              <li onClick={() => onCategorySelect(null)} className="hover:text-orange-500 cursor-pointer transition-colors">Browse Categories</li>
              <li onClick={() => handleComingSoon("Manufacturer Directory")} className="hover:text-orange-500 cursor-pointer transition-colors">Verified Manufacturers</li>
              <li onClick={() => handleComingSoon("Sample Hub")} className="hover:text-orange-500 cursor-pointer transition-colors">Request Samples</li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Sell on Mart</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/become-a-seller" className="hover:text-orange-500 transition-colors">Merchant Onboarding</Link></li>
              <li><Link to="/become-a-seller/register" className="hover:text-orange-500 transition-colors">Start Selling Now</Link></li>
              <li onClick={() => handleComingSoon("Seller Center")} className="hover:text-orange-500 cursor-pointer transition-colors">Learning Center</li>
              <li onClick={() => handleComingSoon("Logistics Partner")} className="hover:text-orange-500 cursor-pointer transition-colors">Fulfillment by Work_Abay</li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Client Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li onClick={() => handleComingSoon("Help Center")} className="hover:text-orange-500 cursor-pointer transition-colors">Help Center</li>
              <li onClick={() => handleComingSoon("Live Chat")} className="hover:text-orange-500 cursor-pointer transition-colors">24/7 Live Support</li>
              <li onClick={() => handleComingSoon("Ticket System")} className="hover:text-orange-500 cursor-pointer transition-colors">Track Inquiry</li>
              <li onClick={() => handleComingSoon("Trade Protection")} className="hover:text-orange-500 cursor-pointer transition-colors">Trade Assurance</li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-10 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-left">
          <p>&copy; 2024 Work_Abay Mart Ethiopia. Registered in Addis Ababa.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Sale</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};