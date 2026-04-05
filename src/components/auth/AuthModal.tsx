import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Github, Chrome, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success(type === 'login' ? "Welcome back to Work_Abay!" : "Account created successfully!");
      onClose();
      // Force a re-render of components using the login state
      window.location.reload(); 
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <div className="bg-orange-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-700 rounded-full -ml-12 -mb-12 opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl">
              <span className="text-orange-600 font-black text-3xl">W</span>
            </div>
            <DialogTitle className="text-3xl font-black mb-2 tracking-tight">Work_Abay Mart</DialogTitle>
            <DialogDescription className="text-orange-100 font-medium">
              Join Ethiopia's premier digital marketplace
            </DialogDescription>
          </div>
        </div>

        <div className="p-8 bg-white">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-neutral-100 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Join Now</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input id="email" type="email" placeholder="name@company.com" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="pass" className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Password</Label>
                    <button type="button" className="text-[10px] font-bold text-orange-600 uppercase tracking-widest hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input id="pass" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <Button 
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl mt-4 border-none"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Continue to Mart"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input id="name" placeholder="Abebe Bikila" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-up" className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input id="email-up" type="email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass-up" className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input id="pass-up" type="password" placeholder="Create a strong password" className="pl-10 h-12 rounded-xl" required />
                  </div>
                </div>
                <Button 
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl mt-4 border-none"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Start Shopping"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-neutral-100" />
            <span className="relative px-4 bg-white text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl gap-2 font-bold border-neutral-200">
              <Chrome size={18} className="text-red-500" /> Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl gap-2 font-bold border-neutral-200">
              <Github size={18} /> Github
            </Button>
          </div>
        </div>

        <DialogFooter className="p-6 bg-neutral-50/50 border-t border-neutral-100 sm:justify-center">
          <p className="text-[10px] text-neutral-400 text-center leading-relaxed max-w-[280px]">
            By continuing, you agree to Work_Abay Mart's 
            <span className="text-neutral-900 font-bold underline mx-1 cursor-pointer">Terms of Service</span> and 
            <span className="text-neutral-900 font-bold underline mx-1 cursor-pointer">Privacy Policy</span>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};