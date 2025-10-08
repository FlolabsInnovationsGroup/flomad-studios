'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, MessageCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';


interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setStatusMessage('First name is required');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.lastName.trim()) {
      setStatusMessage('Last name is required');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.email.trim()) {
      setStatusMessage('Email is required');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.subject) {
      setStatusMessage('Please select a subject');
      setSubmitStatus('error');
      return false;
    }
    if (!formData.message.trim()) {
      setStatusMessage('Message is required');
      setSubmitStatus('error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <GlassCard className="p-6 sm:p-8 md:p-12 border border-border/60" variant="primary" blur="xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-heading text-enhanced-strong">
              Let&rsquo;s Create <span className="bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">Together</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-foreground/70 leading-relaxed text-enhanced-readable">
              Have a project idea or want to learn more about our services? We&rsquo;d love to hear from you.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">

            {/* Contact Details */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 sm:mb-6 text-enhanced-strong">Get in Touch</h2>
                <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-6 sm:mb-8 text-enhanced-readable">
                  Whether you&rsquo;re interested in working together on a project, have questions about our services,
                  or just want to say hello, we&rsquo;re here to help.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <GlassCard className="p-4 sm:p-6" variant="secondary" blur="lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-primary/15 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-heading mb-1 text-enhanced-strong">Email Us</h3>
                      <p className="text-sm sm:text-base text-foreground/70 mb-2 text-enhanced-readable">For project inquiries and collaboration</p>
                      <a href="mailto:studios@flomadlabs.com" className="text-sky-300 hover:text-sky-200 transition-colors text-sm sm:text-base">
                        studios@flomadlabs.com
                      </a>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4 sm:p-6" variant="secondary" blur="lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-secondary/15 rounded-lg flex-shrink-0">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-heading mb-1 text-enhanced-strong">Connect on LinkedIn</h3>
                      <p className="text-sm sm:text-base text-foreground/70 mb-2 text-enhanced-readable">Follow our company updates and connect</p>
                      <a
                        href="https://www.linkedin.com/company/flomad-labs-r-d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm sm:text-base"
                      >
                        Flomad Labs R&D
                      </a>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4 sm:p-6" variant="secondary" blur="lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-accent/15 rounded-lg flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-heading mb-1 text-enhanced-strong">Response Time</h3>
                      <p className="text-sm sm:text-base text-foreground/70 mb-2 text-enhanced-readable">We&rsquo;ll get back to you</p>
                      <p className="text-amber-300 text-sm sm:text-base">
                        Usually within 24-48 hours
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Contact Form */}
            <GlassCard className="p-6 sm:p-8" variant="primary" blur="lg">
              <h3 className="text-xl sm:text-2xl font-bold text-heading mb-4 sm:mb-6 text-enhanced-strong">Send us a Message</h3>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${submitStatus === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-heading mb-2 text-enhanced-strong">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/90 dark:bg-background-muted/80 border border-border/60 rounded-lg text-heading placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 text-sm sm:text-base"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-heading mb-2 text-enhanced-strong">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/90 dark:bg-background-muted/80 border border-border/60 rounded-lg text-heading placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 text-sm sm:text-base"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-background/90 dark:bg-background-muted/80 border border-border/60 rounded-lg text-heading placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-heading mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-background/85 dark:bg-background-muted/80 border border-border/60 rounded-lg text-heading focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                  >
                    <option value="">Select a subject</option>
                    <option value="technology-inquiry">Technology Project Inquiry</option>
                    <option value="ai-robotics">AI & Robotics Content</option>
                    <option value="research-communication">Research Communication</option>
                    <option value="internship">Internship Opportunity</option>
                    <option value="career-change">Career Change Program</option>
                    <option value="collaboration">Partnership/Collaboration</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-background/85 dark:bg-background-muted/80 border border-border/60 rounded-lg text-heading placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none disabled:opacity-50"
                    placeholder="Tell us about your project, questions, or how we can help with technology content creation..."
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  glow
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </GlassButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Additional Ways to Connect */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-6 sm:mb-8 text-enhanced-strong">
            Other Ways to Connect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <GlassCard className="p-6" variant="secondary" blur="lg">
              <h3 className="text-xl font-bold text-heading mb-4">Our Services</h3>
              <p className="text-foreground/70 mb-6">
                Explore the range of creative services we offer for your business.
              </p>
              <GlassButton variant="ghost" size="sm" className="border-primary/40 hover:border-primary/60">
                <Link href="/services">View Services</Link>
              </GlassButton>
            </GlassCard>
            <GlassCard className="p-6" variant="secondary" blur="lg">
              <h3 className="text-xl font-bold text-heading mb-4">View Our Work</h3>
              <p className="text-foreground/70 mb-6">
                See examples of our recent projects and creative work.
              </p>
              <GlassButton variant="ghost" size="sm" className="border-secondary/40 hover:border-secondary/60">
                <Link href="/work">View Portfolio</Link>
              </GlassButton>
            </GlassCard>

            <GlassCard className="p-6" variant="secondary" blur="lg">
              <h3 className="text-xl font-bold text-heading mb-4">Learn About Us</h3>
              <p className="text-foreground/70 mb-6">
                Discover our story and connection to the Flomad ecosystem.
              </p>
              <GlassButton variant="ghost" size="sm" className="border-accent/40 hover:border-accent/60">
                <Link href="/about">Our Story</Link>
              </GlassButton>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
