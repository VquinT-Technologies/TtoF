'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Check, Sparkles, Eye, EyeOff, Zap, Layout, Share2, Globe, Shield } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 3, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white font-sans text-slate-900">
      
      {/* Left Side - Visuals & Features */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900 to-slate-900"></div>
        </div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit mb-12">
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold">FlowGen</span>
          </Link>
          
          <div className="max-w-md space-y-4">
             <h1 className="text-4xl font-bold leading-tight tracking-tight">
               Start visualizing your ideas today.
             </h1>
             <p className="text-lg text-slate-300">
               Create professional diagrams in seconds with AI. No credit card required.
             </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-6">
          {[
            { icon: Layout, title: 'Smart Templates', desc: 'Auto-generated layouts for any use case' },
            { icon: Share2, title: 'Easy Sharing', desc: 'Export to PNG, SVG, or share live links' },
            { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption for your data' }
          ].map((item, i) => (
             <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
               <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                 <item.icon className="w-5 h-5 text-indigo-400" />
               </div>
               <div>
                 <h3 className="font-semibold text-slate-100">{item.title}</h3>
                 <p className="text-sm text-slate-400">{item.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex items-center justify-center p-8 bg-white lg:bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
            <p className="mt-2 text-slate-600">Free forever for individuals. Upgrade for teams.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {error}
            </div>
          )}

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Strength Meter */}
                {formData.password && (
                   <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`} 
                          style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 min-w-[50px] text-right">{passwordStrength.label}</span>
                   </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>
                <label htmlFor="terms" className="text-sm text-slate-600 leading-snug">
                  I agree to the <a href="#" className="font-semibold text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-indigo-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
