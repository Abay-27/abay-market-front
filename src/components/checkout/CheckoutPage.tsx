import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Layout } from '../layout/Layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ShoppingCart, CheckCircle2, ChevronRight, CreditCard, Truck, Receipt, Check, Loader2, QrCode, Phone, Building2, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';
type PaymentMethod = 'telebirr' | 'cbe-birr' | 'credit-card';

export const CheckoutPage = () => {
  const { cart, totalPrice, cartCount, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    city: 'Addis Ababa',
    address: '',
    subCity: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telebirr');
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

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

  const nextStep = () => {
    if (step === 'shipping') {
      if (!shippingData.fullName || !shippingData.phone || !shippingData.address) {
        toast.error('Please fill in all shipping details');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (paymentMethod === 'telebirr' || paymentMethod === 'cbe-birr') {
        if (!paymentDetails.transactionId) {
          toast.error('Please enter the transaction ID/Reference');
          return;
        }
      }
      setStep('review');
    }
  };

  const completeOrder = async () => {
    setIsProcessing(true);
    // Simulate API call for payment verification
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setStep('success');
    clearCart();
    toast.success('Payment verified and order placed!');
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error(`Could not copy ${label}. Please select and copy manually.`);
    }
  };

  if (cart.length === 0 && step !== 'success') {
    navigate('/');
    return null;
  }

  const vat = totalPrice * 0.15;
  const shippingFee = 250;
  const finalTotal = totalPrice + vat + shippingFee;

  return (
    <Layout onSearch={handleSearch} onCategorySelect={handleCategorySelect} cartCount={cartCount}>
      <main className="container mx-auto px-4 py-8 md:py-12">
        {step !== 'success' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0"></div>
              {[
                { id: 'shipping', label: 'Shipping', icon: Truck },
                { id: 'payment', label: 'Payment', icon: CreditCard },
                { id: 'review', label: 'Review', icon: Receipt },
              ].map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted = ['payment', 'review', 'success'].includes(step) && idx < ['shipping', 'payment', 'review'].indexOf(step);
                
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive ? 'bg-orange-600 border-orange-600 text-white scale-110 shadow-lg shadow-orange-600/20' : 
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      'bg-white border-neutral-200 text-neutral-400'
                    }`}>
                      {isCompleted ? <Check size={24} /> : <Icon size={24} />}
                    </div>
                    <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${isActive ? 'text-orange-600' : 'text-neutral-400'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm shadow-neutral-200/50">
                  <h2 className="text-3xl font-black text-neutral-900 mb-8">Shipping Information</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="font-bold text-neutral-700">Full Name</Label>
                      <Input 
                        id="fullName" 
                        placeholder="e.g. Abebe Bikila" 
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                        className="h-14 rounded-xl border-neutral-200 focus:ring-orange-600/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold text-neutral-700">Phone Number (for delivery)</Label>
                      <Input 
                        id="phone" 
                        placeholder="e.g. +251 911 223344" 
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                        className="h-14 rounded-xl border-neutral-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="font-bold text-neutral-700">City</Label>
                        <Input 
                          id="city" 
                          value={shippingData.city}
                          readOnly
                          className="h-14 bg-neutral-50 rounded-xl border-neutral-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subCity" className="font-bold text-neutral-700">Sub-city / District</Label>
                        <Input 
                          id="subCity" 
                          placeholder="e.g. Bole" 
                          value={shippingData.subCity}
                          onChange={(e) => setShippingData({...shippingData, subCity: e.target.value})}
                          className="h-14 rounded-xl border-neutral-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-bold text-neutral-700">Detailed Address / Landmark</Label>
                      <textarea 
                        id="address" 
                        className="w-full p-4 border border-neutral-200 rounded-xl min-h-[100px] focus:ring-2 focus:ring-orange-600/20 outline-none transition-all"
                        placeholder="e.g. Near Edna Mall, House #123"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                      />
                    </div>
                    <Button 
                      onClick={nextStep}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white h-16 rounded-2xl font-black text-xl mt-8 shadow-lg shadow-orange-600/20"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="bg-neutral-50 p-8 rounded-3xl border-2 border-dashed border-neutral-200 sticky top-24">
                    <h3 className="text-xl font-black text-neutral-900 mb-8">Order Summary</h3>
                    <div className="space-y-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-white rounded-2xl border border-neutral-100 overflow-hidden flex-shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-neutral-900 leading-tight">{item.name}</p>
                            <p className="text-sm text-neutral-500 mt-1">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-black text-neutral-900">{(item.price * item.quantity).toLocaleString()} ETB</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 pt-10 border-t-2 border-neutral-200 space-y-4">
                      <div className="flex justify-between text-neutral-600">
                        <span className="font-bold">Subtotal</span>
                        <span className="font-black text-neutral-900">{totalPrice.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between text-neutral-600">
                        <span className="font-bold">VAT (15%)</span>
                        <span className="font-black text-neutral-900">{vat.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between text-neutral-600 pb-4">
                        <span className="font-bold">Shipping</span>
                        <span className="font-black text-neutral-900">{shippingFee.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                        <span className="text-2xl font-black text-neutral-900">Total</span>
                        <span className="text-3xl font-black text-orange-600">{finalTotal.toLocaleString()} ETB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 space-y-4">
                    <h2 className="text-2xl font-black text-neutral-900 mb-6">Choose Method</h2>
                    {[
                      { id: 'telebirr', name: 'Telebirr', desc: 'Ethio Telecom Mobile Money', icon: QrCode, color: 'text-blue-600' },
                      { id: 'cbe-birr', name: 'CBE Birr', desc: 'Bank Transfer / CBE Birr App', icon: Building2, color: 'text-emerald-600' },
                      { id: 'credit-card', name: 'Card', desc: 'Visa, Mastercard, etc.', icon: CreditCard, color: 'text-orange-600' },
                    ].map((m) => (
                      <div 
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                          paymentMethod === m.id ? 'border-orange-600 bg-orange-50/50 shadow-md ring-4 ring-orange-600/5' : 'border-neutral-100 hover:border-neutral-200 bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-neutral-100 ${m.color}`}>
                          <m.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-neutral-900">{m.name}</p>
                          <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{m.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === m.id ? 'border-orange-600 bg-orange-600 text-white' : 'border-neutral-200'
                        }`}>
                          {paymentMethod === m.id && <Check size={14} />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-7">
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-200/50 h-full">
                      <AnimatePresence mode="wait">
                        {paymentMethod === 'telebirr' && (
                          <motion.div
                            key="telebirr-ui"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-4 mb-8">
                              <div className="bg-blue-600 text-white p-3 rounded-2xl">
                                <QrCode size={32} />
                              </div>
                              <div>
                                <h3 className="text-xl font-black">Telebirr Payment</h3>
                                <p className="text-neutral-500">Pay using your mobile app</p>
                              </div>
                            </div>
                            
                            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 space-y-4 text-center">
                              <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Scan QR Code or Use Code</p>
                              <div className="w-48 h-48 bg-white mx-auto rounded-2xl p-4 border border-neutral-100 flex items-center justify-center relative group cursor-pointer shadow-sm">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WORKABAY-MART-PAYMENT" alt="Telebirr QR" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-2xl">
                                  <ExternalLink className="text-blue-600" />
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-3 bg-white py-3 px-6 rounded-xl border border-neutral-100 w-fit mx-auto shadow-sm">
                                <span className="font-black text-2xl tracking-tighter text-neutral-800">M-987452</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => copyToClipboard('987452', 'Merchant Code')}>
                                  <Copy size={16} />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="trans-id" className="font-bold text-neutral-700">Transaction ID / Reference Number</Label>
                              <Input 
                                id="trans-id" 
                                placeholder="e.g. ABC123XYZ" 
                                value={paymentDetails.transactionId}
                                onChange={(e) => setPaymentDetails({...paymentDetails, transactionId: e.target.value})}
                                className="h-14 rounded-xl border-neutral-200 focus:ring-blue-600/20 text-lg font-mono"
                              />
                              <p className="text-xs text-neutral-500 font-medium">Enter the ID received in your SMS after payment.</p>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === 'cbe-birr' && (
                          <motion.div
                            key="cbe-ui"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-4 mb-8">
                              <div className="bg-emerald-600 text-white p-3 rounded-2xl">
                                <Building2 size={32} />
                              </div>
                              <div>
                                <h3 className="text-xl font-black">CBE Birr / Bank Transfer</h3>
                                <p className="text-neutral-500">Transfer to our official account</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Account Name</span>
                                  <span className="font-black text-neutral-900">Work_Abay Mart PLC</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Account Number</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-black text-lg text-neutral-900">1000123456789</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-100" onClick={() => copyToClipboard('1000123456789', 'Account Number')}>
                                      <Copy size={16} />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Bank Name</span>
                                  <span className="font-black text-neutral-900">Commercial Bank of Ethiopia</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="cbe-trans-id" className="font-bold text-neutral-700">Transaction Reference</Label>
                                <Input 
                                  id="cbe-trans-id" 
                                  placeholder="Enter reference or bank TXN ID" 
                                  value={paymentDetails.transactionId}
                                  onChange={(e) => setPaymentDetails({...paymentDetails, transactionId: e.target.value})}
                                  className="h-14 rounded-xl border-neutral-200 focus:ring-emerald-600/20"
                                />
                                <p className="text-xs text-neutral-500">Upload receipt screenshot (Optional in demo)</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === 'credit-card' && (
                          <motion.div
                            key="card-ui"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-4 mb-8">
                              <div className="bg-orange-600 text-white p-3 rounded-2xl">
                                <CreditCard size={32} />
                              </div>
                              <div>
                                <h3 className="text-xl font-black">Card Payment</h3>
                                <p className="text-neutral-500">Securely pay with Visa/Mastercard</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-num" className="font-bold text-neutral-700">Card Number</Label>
                                <Input id="card-num" placeholder="0000 0000 0000 0000" className="h-12 rounded-xl" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiry" className="font-bold text-neutral-700">Expiry (MM/YY)</Label>
                                  <Input id="expiry" placeholder="MM/YY" className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvv" className="font-bold text-neutral-700">CVV</Label>
                                  <Input id="cvv" placeholder="123" className="h-12 rounded-xl" />
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-3 border border-orange-100">
                              <ShieldCheck className="text-orange-600" size={20} />
                              <p className="text-xs font-bold text-orange-700">Your transaction is protected with 256-bit SSL encryption.</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-12 flex gap-4">
                        <Button 
                          variant="outline"
                          onClick={() => setStep('shipping')}
                          className="flex-1 h-14 rounded-2xl font-bold border-2"
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={nextStep}
                          className="flex-2 bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-2xl font-black text-lg shadow-lg shadow-orange-600/20"
                        >
                          Review Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-2xl shadow-neutral-200/50 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                    <Receipt size={240} />
                  </div>
                  
                  <h2 className="text-4xl font-black text-neutral-900 mb-12">Final Confirmation</h2>
                  
                  <div className="space-y-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Delivery Destination</h3>
                          <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                            <p className="font-black text-neutral-900 text-lg">{shippingData.fullName}</p>\
                            <p className="text-neutral-600 font-medium mt-1">{shippingData.address}</p>
                            <p className="text-neutral-600 font-medium">{shippingData.subCity}, {shippingData.city}</p>
                            <div className="flex items-center gap-2 mt-4 text-orange-600 font-bold">
                              <Phone size={16} />
                              <span>{shippingData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Payment Details</h3>
                          <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-orange-600 shadow-sm">
                                {paymentMethod === 'telebirr' ? <QrCode size={20} /> : paymentMethod === 'cbe-birr' ? <Building2 size={20} /> : <CreditCard size={20} />}
                              </div>
                              <p className="font-black text-neutral-900 text-lg">{paymentMethod.toUpperCase()}</p>
                            </div>
                            {paymentMethod !== 'credit-card' && (
                              <div className="space-y-1">
                                <p className="text-xs font-bold text-neutral-400 uppercase">Reference ID</p>
                                <p className="font-mono font-black text-neutral-700">{paymentDetails.transactionId}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-neutral-100 pt-12">
                      <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">Bill Overview</h3>
                      <div className="space-y-4 max-w-md">
                        <div className="flex justify-between text-neutral-600">
                          <span className="font-bold">Cart Value</span>
                          <span className="font-black text-neutral-900">{totalPrice.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span className="font-bold">Tax (15% VAT)</span>
                          <span className="font-black text-neutral-900">{vat.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between text-neutral-600 pb-4">
                          <span className="font-bold">Delivery Service</span>
                          <span className="font-black text-neutral-900">{shippingFee.toLocaleString()} ETB</span>
                        </div>
                        <div className="pt-6 border-t-2 border-neutral-100 flex justify-between items-center">
                          <span className="text-2xl font-black text-neutral-900">Amount Payable</span>
                          <span className="text-4xl font-black text-orange-600">{finalTotal.toLocaleString()} ETB</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setStep('payment')}
                      className="flex-1 h-16 rounded-2xl font-black text-lg border-2"
                      disabled={isProcessing}
                    >
                      Edit Payment
                    </Button>
                    <Button 
                      onClick={completeOrder}
                      disabled={isProcessing}
                      className="flex-[2] bg-neutral-900 hover:bg-neutral-800 text-white h-16 rounded-2xl font-black text-xl shadow-2xl shadow-neutral-900/20 group"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Verifying Payment...
                        </>
                      ) : (
                        <span className="flex items-center">
                          Confirm & Pay {finalTotal.toLocaleString()} ETB
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-20"
              >
                <div className="w-32 h-32 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-emerald-600 shadow-2xl shadow-emerald-600/20 rotate-12 hover:rotate-0 transition-transform duration-500">
                  <CheckCircle2 size={64} />
                </div>
                <h1 className="text-5xl font-black text-neutral-900 mb-6">Order Secured!</h1>
                <p className="text-neutral-500 mb-12 text-xl font-medium px-4">
                  Your payment has been successfully verified. 
                  We've started preparing your items for delivery to <span className="text-orange-600 font-bold">{shippingData.city}</span>.
                </p>
                <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-neutral-100 mb-12 text-left shadow-inner">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">Tracking ID</span>
                      <p className="font-black text-neutral-900 text-xl">#WA-{Math.floor(Math.random() * 900000) + 100000}</p>\
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">Timeline</span>
                      <p className="font-black text-neutral-900 text-xl">2-3 Days</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-16 rounded-2xl font-black text-xl shadow-lg shadow-orange-600/20"
                  >\
                    Browse More
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/admin/orders')}
                    className="flex-1 h-16 rounded-2xl font-black text-xl border-2"
                  >
                    View Order
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </Layout>
  );
};