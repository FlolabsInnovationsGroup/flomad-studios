'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-blue-600/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-emerald-500/15 to-green-600/10 rounded-full blur-3xl animate-float-delay-1" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-12 text-center max-w-md" variant="primary" blur="xl">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
                <p className="text-gray-300">
                  Your account has been created. Redirecting to login...
                </p>
              </div>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-blue-600/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-emerald-500/15 to-green-600/10 rounded-full blur-3xl animate-float-delay-1" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/20 to-yellow-500/15 rounded-full blur-3xl animate-float-delay-2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Registration Form */}
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
                    <p className="text-sm text-sky-300">Join Our Creative Community</p>
                  </div>
                </Link>
                <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                <p className="text-gray-300">Start your creative journey with us</p>
              </div>

              {/* Registration Form */}
              <GlassCard className="p-8" variant="primary" blur="xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-300" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
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
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="Create a password"
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

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Create Account Button */}
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
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </GlassButton>
                </form>

                {/* Links */}
                <div className="mt-6 text-center space-y-2">
                  <Link href="/login" className="text-sm text-sky-300 hover:text-sky-200 transition-colors">
                    Already have an account? Sign in
                  </Link>
                  <br />
                  <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    ← Back to Home
                  </Link>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Join the Community */}
              <GlassCard className="p-8" variant="secondary" blur="lg">
                <h3 className="text-2xl font-bold text-white mb-6">Join Our Creative Community</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Content Creation Tools</p>
                      <p className="text-gray-400 text-sm">Access to video, podcast, and blog publishing tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Mentorship Program</p>
                      <p className="text-gray-400 text-sm">Learn from experienced creators and industry professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Collaborative Projects</p>
                      <p className="text-gray-400 text-sm">Work on real content with other creators</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Analytics & Insights</p>
                      <p className="text-gray-400 text-sm">Track your content performance and growth</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Application Process */}
              <GlassCard className="p-8" variant="accent" blur="lg">
                <h3 className="text-2xl font-bold text-white mb-6">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-sky-500/20 border border-sky-400/30 rounded-full flex items-center justify-center text-sky-300 font-semibold text-sm">
                      1
                    </div>
                    <p className="text-white">Create your account with basic information</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 rounded-full flex items-center justify-center text-emerald-300 font-semibold text-sm">
                      2
                    </div>
                    <p className="text-white">Complete your creator profile and interests</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-500/20 border border-amber-400/30 rounded-full flex items-center justify-center text-amber-300 font-semibold text-sm">
                      3
                    </div>
                    <p className="text-white">Access your dashboard and start creating</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Note:</strong> New accounts start as Content Creator level. 
                    Apply for advanced roles through your dashboard settings.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
