import Link from 'next/link';
import { Zap, Palette, Smartphone, Download, RefreshCw, Target, ArrowRight, Sparkles, ChevronRight, Play, CheckCircle2, Star, Shield, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Sophisticated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/20 rounded-[100%] blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-pink-100/20 rounded-[100%] blur-[100px]"></div>
      </div>

      {/* Modern Navbar */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent data-[scrolled=true]:bg-white/80 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:border-slate-200/50">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-500"></div>
                <Zap className="w-5 h-5 text-white relative z-10 fill-current" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                FlowGen
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'How It Works', 'Pricing'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  {item}
                </Link>
              ))}
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1 max-w-2xl text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider animate-fade-in-up">
                <Sparkles className="w-3 h-3" />
                <span>Next Gen AI Diagramming</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Visualize complex logic <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
                  in seconds.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Turn text descriptions into professional diagrams instantly. FlowGen understands your architecture and visualizes it perfectly using advanced AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/signup"
                  className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Create Diagram Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="h-14 px-8 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-slate-700" />
                  View Demo
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
                 <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                     <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                   </div>
                   No credit card required
                 </div>
                 <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                     <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                   </div>
                   Export to SVG/PNG
                 </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full max-w-xl lg:max-w-none relative perspective-1000 group">
              {/* Abstract decorations */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200 overflow-hidden transform transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
                <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    Generating...
                  </div>
                </div>
                
                <div className="p-8 space-y-8 bg-slate-50/50 min-h-[400px]">
                   {/* Simulated Chat Interface */}
                   <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                     <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600">
                       Create a flow for a user authentication system with email verification.
                     </div>
                   </div>

                   {/* Simulated Diagram Output */}
                   <div className="relative mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-6 animate-pulse-slow">
                      <div className="flex gap-8">
                        <div className="px-6 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-semibold text-slate-700">User</div>
                        <div className="px-6 py-3 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm text-sm font-semibold text-indigo-700">Sign Up</div>
                      </div>
                      <div className="h-8 w-px border-l-2 border-dashed border-slate-300"></div>
                      <div className="px-6 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        Verify Email
                      </div>
                      <div className="grid grid-cols-2 gap-8 w-full">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-px border-l-2 border-dashed border-slate-300"></div>
                          <div className="px-4 py-2 bg-green-50 border border-green-200 rounded text-xs font-medium text-green-700">Success</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-px border-l-2 border-dashed border-slate-300"></div>
                          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded text-xs font-medium text-red-700">Fail</div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Floaties */}
              <div className="absolute -right-6 top-20 p-4 bg-white rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-100 animate-bounce-slow">
                <Target className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="absolute -left-6 bottom-32 p-4 bg-white rounded-2xl shadow-xl shadow-pink-500/10 border border-slate-100 animate-bounce-slow animation-delay-2000">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos */}
             {['Acme Corp', 'GlobalTech', 'Nebula', 'Circle', 'FoxRun'].map(name => (
               <span key={name} className="text-xl font-bold font-display text-slate-800">{name}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '50K+', label: 'Diagrams Generated' },
                { value: '10K+', label: 'Active Users' },
                { value: '1.2s', label: 'Avg Generation Time' },
                { value: '4.9/5', label: 'Customer Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 tracking-tight">
              Powerful Features for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Everything you need to create, customize, and share professional diagrams without the manual hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                title: 'Lightning Fast AI',
                description: 'State-of-the-art AI understands context and intent instantly to generate accurate flows.',
              },
              {
                icon: <Palette className="w-6 h-6 text-purple-600" />,
                title: 'Smart Styling',
                description: 'Automatic color schemes and layout optimization ensure professional-looking results every time.',
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
                title: 'Live Preview',
                description: 'See your changes in real-time as you type. Iterate quickly to get the perfect diagram.',
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-600" />,
                title: 'Enterprise Security',
                description: 'Your data is encrypted and secure. We prioritize privacy and data protection.',
              },
              {
                icon: <Globe className="w-6 h-6 text-cyan-600" />,
                title: 'Collaborate Anywhere',
                description: 'Access your diagrams from any device. Share seamlessly with your team.',
              },
              {
                icon: <Download className="w-6 h-6 text-pink-600" />,
                title: 'High-Res Export',
                description: 'Download in SVG for vector quality or PNG for easy sharing in presentations.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to visualize your next big idea?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and designers who use FlowGen to communicate logic clearly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link
               href="/signup"
               className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
             >
               Get Started for Free
             </Link>
             <Link
               href="/login"
               className="px-8 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all duration-300"
             >
               Contact Sales
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-lg">
                  <Zap className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="text-xl font-bold text-slate-900">FlowGen</span>
              </div>
              <p className="text-slate-600 max-w-sm leading-relaxed">
                The AI-powered standard for diagram generation. 
                Helping teams communicate complex logic with simplicity and speed.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-slate-600 text-sm">
                <li><Link href="#" className="hover:text-indigo-600 transition">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Integrations</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Lookbook</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-slate-600 text-sm">
                <li><Link href="#" className="hover:text-indigo-600 transition">About</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 FlowGen Inc. All rights reserved.</p>
            <div className="flex space-x-6 text-slate-500 text-sm">
              <Link href="#" className="hover:text-indigo-600 transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-indigo-600 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
