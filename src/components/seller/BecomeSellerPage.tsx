import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { 
  Rocket, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Store,
  DollarSign,
  Package,
  CheckCircle,
  BarChart3,
  Globe2
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useCart } from '../../context/CartContext';

export const BecomeSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/become-a-seller/register');
  };

  return (
    <Layout 
      cartCount={cartCount} 
      onSearch={(q) => navigate(`/?q=${q}`)} 
      onCategorySelect={(c) => navigate(c ? `/category/${c.toLowerCase()}` : '/')}
    >
      {/* Hero Section */}
      <section className="relative bg-neutral-900 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/successful-seller-hero-0670053a-1775231506458.webp"
            alt="Work_Abay Seller Network"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-600 text-white text-[10px] md:text-[12px] font-black px-4 py-1.5 rounded-full w-fit mb-8 uppercase tracking-[0.3em] shadow-xl shadow-orange-600/30"
            >
              Partner Program 2024
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter"
            >
              Scale Your <br />
              <span className="text-orange-500">Enterprise</span> <br />
              Globally
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-2xl font-medium"
            >
              Work_Abay Mart provides the infrastructure for Ethiopian producers to connect with millions of buyers worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6"
            >
              <Button 
                asChild
                size="lg"
                className="h-16 px-10 md:px-12 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 text-lg flex items-center gap-3 group border-none cursor-pointer"
              >
                <Link to="/become-a-seller/register">
                  Start Selling Now
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button 
                onClick={() => toast.info("Success stories are being updated!")}
                variant="outline"
                className="h-16 px-10 md:px-12 bg-white/10 text-white backdrop-blur-xl border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all text-lg"
              >
                View Case Studies
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 bg-white border-b border-neutral-100 relative z-20 -mt-8 md:-mt-12 mx-4 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-neutral-900/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-24">
            {[
              { label: "Active Buyers", value: "1.2M+", icon: Globe2 },
              { label: "Daily Orders", value: "15K+", icon: Package },
              { label: "Trade Value", value: "$850M+", icon: DollarSign },
              { label: "Partner Regions", value: "45+", icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 flex justify-center">
                   <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <stat.icon size={24} />
                   </div>
                </div>
                <p className="text-3xl md:text-5xl font-black text-neutral-900 mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight">Built for Modern Trade</h2>
              <p className="text-neutral-600 text-lg font-medium">We provide a full-stack ecosystem including logistics, payments, and marketing tools tailored for the African market.</p>
            </div>
            <Link to="/become-a-seller/register" className="text-orange-600 font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group">
              Join the Network <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-blue-600" size={32} />,
                title: "Global Logistics",
                desc: "Integrated shipping with Ethiopian Post and international carriers. We handle the paperwork, you handle the production.",
                image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/logistics-warehouse-7b011b46-1775231506515.webp"
              },
              {
                icon: <TrendingUp className="text-green-600" size={32} />,
                title: "Smart Analytics",
                desc: "Access real-time data on market demand, pricing trends, and customer behavior to optimize your inventory.",
                image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/marketplace-diversity-3c939958-1775231505758.webp"
              },
              {
                icon: <ShieldCheck className="text-orange-600" size={32} />,
                title: "Trade Assurance",
                desc: "Our escrow-based payment system ensures you get paid on time, every time, protecting both you and your buyers.",
                image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/verified-product-coffee-f3f537fd-1775231506929.webp"
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                   <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight">{benefit.title}</h3>
                  <p className="text-neutral-600 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[700px]">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
                  alt="Business growth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/20" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                         <CheckCircle size={24} />
                      </div>
                      <div>
                         <p className="font-black text-neutral-900">Verified Business</p>
                         <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Trust Level: Global Partner</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-orange-600" />
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-neutral-400 uppercase">
                         <span>Compliance check</span>
                         <span>85% Complete</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-600/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight leading-none">Launch in 3 <br/> Simple Steps</h2>
              <div className="space-y-10">
                {[
                  {
                    step: "01",
                    title: "Digital Onboarding",
                    desc: "Submit your business details and verification docs. Our team reviews applications within 48 hours.",
                    icon: <Store size={24} />
                  },
                  {
                    step: "02",
                    title: "Inventory Setup",
                    desc: "List your products with our high-speed listing tool. Connect your warehouse or use our fulfillment centers.",
                    icon: <Package size={24} />
                  },
                  {
                    step: "03",
                    title: "Go Live & Scale",
                    desc: "Your products are visible to millions. Manage orders and payouts through the Work_Abay Merchant Dashboard.",
                    icon: <BarChart3 size={24} />
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 md:gap-8 group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">{step.title}</h4>
                      <p className="text-neutral-500 font-medium leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button 
                asChild
                className="h-16 px-12 bg-neutral-900 text-white rounded-2xl font-black hover:bg-neutral-800 transition-all flex items-center gap-3 text-lg shadow-2xl shadow-neutral-900/20 group border-none cursor-pointer"
              >
                <Link to="/become-a-seller/register">
                  Start Application <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="bg-orange-600 rounded-[3rem] md:rounded-[4rem] p-8 md:p-32 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(234,88,12,0.4)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full -mr-64 -mt-64 opacity-50 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-700 rounded-full -ml-64 -mb-64 opacity-50 blur-[100px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
                Ready to grow?
              </h2>
              <p className="text-orange-100 text-xl md:text-2xl mb-12 font-medium">
                Join the waitlist for our next cohort of international verified merchants.
              </p>
              <form 
                onSubmit={handleJoin}
                className="flex flex-col md:flex-row gap-4 bg-white/10 p-2 md:p-3 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <input 
                  type="email" 
                  placeholder="Enter professional email"
                  required
                  className="flex-1 px-8 py-5 rounded-2xl md:rounded-full focus:outline-none text-neutral-900 text-lg bg-white font-medium"
                />
                <button 
                  type="submit"
                  className="px-12 py-5 bg-neutral-900 text-white rounded-2xl md:rounded-full font-black hover:bg-neutral-800 transition-all text-lg shadow-xl uppercase tracking-widest whitespace-nowrap cursor-pointer"
                >
                  Join Waitlist
                </button>
              </form>
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                 <div className="flex items-center gap-2 text-orange-100/70 font-bold uppercase text-[10px] tracking-widest">
                    <CheckCircle2 size={16} className="text-white" /> Verified Entities Only
                 </div>
                 <div className="flex items-center gap-2 text-orange-100/70 font-bold uppercase text-[10px] tracking-widest">
                    <CheckCircle2 size={16} className="text-white" /> Trade License Required
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};