'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, CheckCircle2, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Demo credentials
    if (email === 'demo@flowgen.com' && password === 'demo123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      router.push('/dashboard');
    } else {
      setError('Invalid credentials! Try demo@flowgen.com / demo123');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white font-sans text-slate-900">
      
      {/* Left Side - Visuals & Testimonial */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
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
               Turn complex logic into clear visuals.
             </h1>
             <p className="text-lg text-slate-300">
               Join 50,000+ engineers and product managers who communicate better with AI-generated diagrams.
             </p>
          </div>
        </div>

        <div className="relative z-10 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-2xl">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-lg font-medium text-slate-100 italic mb-6">
            "FlowGen has completely transformed how we document our microservices architecture. It saves us hours every single week."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">EM</div>
            <div>
              <div className="font-semibold">Elena Martinez</div>
              <div className="text-sm text-slate-400">Senior Solutions Architect</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-white lg:bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-slate-600">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {error}
            </div>
          )}

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
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
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer" />
                  <span className="ml-2 text-slate-600 group-hover:text-slate-900">Remember me</span>
                </label>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-center">
                <p className="text-xs font-semibold text-indigo-900 mb-1">Demo Credentials</p>
                <div className="text-xs text-indigo-700 space-x-4">
                  <span><span className="font-semibold">User:</span> demo@flowgen.com</span>
                  <span><span className="font-semibold">Pass:</span> demo123</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
