import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  CreditCard,
  Briefcase,
  Store,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useCart } from '../../context/CartContext';

type Step = 1 | 2 | 3 | 4;

export const SellerRegistrationPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const { cartCount } = useCart();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Retailer',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    tinNumber: '',
    bankAccount: '',
    category: 'Electronics',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateStep = (s: Step) => {
    if (s === 1) return formData.businessName.length > 2;
    if (s === 2) return formData.ownerName.length > 2 && formData.email.includes('@') && formData.phone.length > 8;
    if (s === 3) return formData.tinNumber.length >= 10;
    if (s === 4) return formData.bankAccount.length > 5;
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    if (step < 4) setStep((s) => (s + 1) as Step);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      toast.error("Please enter your account details.");
      return;
    }
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success("Application Submitted!", {
        description: "Your seller account is now being reviewed. Redirecting to your dashboard...",
      });
      navigate('/admin');
    }, 2500);
  };

  return (
    <Layout 
      cartCount={cartCount} 
      onSearch={(q) => navigate(`/?q=${q}`)} 
      onCategorySelect={(c) => navigate(c ? `/category/${c.toLowerCase()}` : '/')}
    >
      <div className="min-h-screen bg-neutral-50 pb-20">
        {/* Header Section */}
        <div className="bg-neutral-900 text-white py-16 md:py-24 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/marketplace-diversity-3c939958-1775231505758.webp"
              alt="Registration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
            >
              Start Your <span className="text-orange-500">Legacy</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
            >
              Join Ethiopia's most powerful digital trade network and reach buyers across the globe.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-neutral-200 border border-neutral-100 mb-8 overflow-x-auto">
              <div className="flex justify-between items-center relative min-w-[500px]">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />
                {[
                  { id: 1, label: 'Business', icon: Building2 },
                  { id: 2, label: 'Identity', icon: User },
                  { id: 3, label: 'Verification', icon: Briefcase },
                  { id: 4, label: 'Payment', icon: CreditCard },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = step === s.id;
                  const isCompleted = step > s.id;
                  return (
                    <div key={s.id} className="relative z-10 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                        isActive ? 'bg-orange-600 border-orange-600 text-white scale-110 shadow-lg shadow-orange-600/30' : 
                        isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                        'bg-white border-neutral-200 text-neutral-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                      </div>
                      <span className={`mt-3 text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-orange-600' : 'text-neutral-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-neutral-100">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Business Profile</h2>
                      <p className="text-neutral-500 font-medium">Tell us about your company or shop.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Business Name</Label>
                        <Input 
                          placeholder="e.g. Sidama Premium Coffee" 
                          className="h-14 rounded-2xl bg-neutral-50 border-neutral-100 focus:bg-white transition-all font-bold"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Business Type</Label>
                        <select 
                          className="w-full h-14 rounded-2xl bg-neutral-50 border border-neutral-100 px-4 focus:outline-none focus:ring-2 focus:ring-orange-600/20 font-bold"
                          value={formData.businessType}
                          onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                        >
                          <option>Retailer</option>
                          <option>Wholesaler</option>
                          <option>Manufacturer</option>
                          <option>Farmer / Producer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Store Category</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Agriculture', 'Electronics', 'Fashion', 'Home Decor', 'Handicrafts', 'Bulk Supply'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormData({...formData, category: cat})}
                            className={`p-4 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-wider ${
                              formData.category === cat ? 'border-orange-600 bg-orange-50 text-orange-600 shadow-lg shadow-orange-600/10' : 'border-neutral-100 bg-white text-neutral-500 hover:border-neutral-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Owner Information</h2>
                      <p className="text-neutral-500 font-medium">Contact details for the account holder.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Full Name</Label>
                        <Input 
                          placeholder="Abebe Bikila" 
                          className="h-14 rounded-2xl font-bold"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Email Address</Label>
                          <Input 
                            type="email"
                            placeholder="abebe@company.com" 
                            className="h-14 rounded-2xl font-bold"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Phone Number</Label>
                          <Input 
                            placeholder="+251 911 223 344" 
                            className="h-14 rounded-2xl font-bold"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Physical Address</Label>
                        <textarea 
                          placeholder="Building, Street, Subcity, Addis Ababa"
                          className="w-full p-4 h-32 rounded-2xl border-2 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-orange-600/20 outline-none transition-all font-bold text-sm"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Verification</h2>
                      <p className="text-neutral-500 font-medium">We need to verify your business credentials.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">TIN Number / License ID</Label>
                        <Input 
                          placeholder="10-digit TIN" 
                          className="h-14 rounded-2xl font-mono tracking-widest text-lg font-bold"
                          value={formData.tinNumber}
                          onChange={(e) => setFormData({...formData, tinNumber: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-neutral-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-orange-600 hover:bg-orange-50 transition-all cursor-pointer group">
                          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <Upload size={24} />
                          </div>
                          <div className="text-center">
                            <p className="font-black text-sm text-neutral-900">TIN Certificate</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">PDF, JPG (Max 5MB)</p>
                          </div>
                        </div>
                        <div className="border-2 border-dashed border-neutral-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-orange-600 hover:bg-orange-50 transition-all cursor-pointer group">
                          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <Upload size={24} />
                          </div>
                          <div className="text-center">
                            <p className="font-black text-sm text-neutral-900">Trade License</p>\
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">PDF, JPG (Max 5MB)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Payout Settings</h2>
                      <p className="text-neutral-500 font-medium">How you will receive payments for your sales.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Preferred Method</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['Bank Transfer', 'Telebirr Business'].map((m) => (
                            <div key={m} className="p-6 rounded-2xl border-2 border-orange-600 bg-orange-50 flex items-center gap-4">
                              <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-white">
                                <CheckCircle2 size={14} />
                              </div>
                              <span className="font-black text-neutral-900 uppercase text-xs tracking-widest">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Account Number / Phone ID</Label>
                        <Input 
                          placeholder="Enter details here" 
                          className="h-14 rounded-2xl font-bold"
                          value={formData.bankAccount}
                          onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                          required
                        />
                      </div>

                      <div className="bg-neutral-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                             <ShieldCheck className="text-orange-500" size={24} />
                             <h4 className="font-black text-xl uppercase tracking-tighter">Trade Assurance</h4>
                          </div>
                          <p className="text-neutral-400 text-sm leading-relaxed font-medium">
                            Your funds are protected. We release payments 24 hours after customer confirmation of delivery. 
                            Work_Abay commission is 5% per transaction.
                          </p>
                        </div>
                        <Store className="absolute top-1/2 right-4 -translate-y-1/2 text-white opacity-5" size={120} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between gap-4">
                {step > 1 && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2"
                  >
                    <ArrowLeft size={18} /> Back
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button 
                    type="button"
                    onClick={handleNext}
                    className="h-14 px-12 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest ml-auto gap-2 group border-none"
                  >
                    Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-12 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black uppercase tracking-widest ml-auto shadow-2xl shadow-orange-600/40 border-none"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting</>
                    ) : "Complete Registration" }
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};