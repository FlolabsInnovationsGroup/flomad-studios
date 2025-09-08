'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, Users, Video, Mic, BarChart3, Calendar, Settings } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-blue-600/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-emerald-500/15 to-green-600/10 rounded-full blur-3xl animate-float-delay-1" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/20 to-yellow-500/15 rounded-full blur-3xl animate-float-delay-2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Login Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-3 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/flomadlogo.svg"
                    alt="Flomad Studios Logo"
                    width={48}
                    height={48}
                    className="transition-transform hover:scale-105"
                  />
                  <div className="text-left">
                    <h1 className="text-2xl font-bold text-white">Flomad Studios</h1>
                    <p className="text-sm text-sky-300">Creator Dashboard</p>
                  </div>
                </Link>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Sign in to access your creator dashboard</p>
              </div>

              {/* Login Form */}
              <GlassCard className="p-8" variant="primary" blur="xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    glow
                    disabled={isLoading}
                    className="w-full group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </GlassButton>

                  {/* Google Sign In */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <GlassButton
                    type="button"
                    onClick={handleGoogleSignIn}
                    variant="ghost"
                    size="lg"
                    className="w-full border-white/20 hover:border-white/40"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </GlassButton>
                </form>

                {/* Links */}
                <div className="mt-6 text-center space-y-2">
                  <Link href="/register" className="text-sm text-sky-300 hover:text-sky-200 transition-colors">
                    Don&apos;t have an account? Sign up
                  </Link>
                  <br />
                  <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    ← Back to Home
                  </Link>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right Side - Dashboard Preview & Demo Accounts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Dashboard Preview */}
              <GlassCard className="p-8" variant="secondary" blur="lg">
                <h3 className="text-2xl font-bold text-white mb-6">Creator Dashboard Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Video, label: 'Video Management', description: 'Upload & organize videos' },
                    { icon: Mic, label: 'Podcast Studio', description: 'Create audio content' },
                    { icon: BarChart3, label: 'Analytics', description: 'Track performance' },
                    { icon: Calendar, label: 'Content Calendar', description: 'Plan your content' },
                    { icon: Users, label: 'Team Collaboration', description: 'Work with others' },
                    { icon: Settings, label: 'Studio Settings', description: 'Customize your space' },
                  ].map(({ icon: Icon, label, description }) => (
                    <div key={label} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                      <Icon className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">{label}</p>
                        <p className="text-gray-400 text-xs">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>


            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 