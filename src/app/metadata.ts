import { Metadata } from 'next';

export const siteConfig = {
  name: 'FloStudios.ai',
  description: 'AI-powered creative learning, podcasts, videos, and innovative content for the next generation of technology.',
  url: 'https://www.flostudios.ai',
  ogImage: 'https://www.flostudios.ai/og.jpg',
  links: {
    twitter: 'https://twitter.com/flostudiosai',
    instagram: 'https://instagram.com/flostudiosai',
    youtube: 'https://youtube.com/flostudiosai',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['ai', 'artificial intelligence', 'creative', 'content', 'podcasts', 'videos', 'studio', 'media', 'learning', 'technology'],
  authors: [{ name: 'FloStudios.ai' }],
  creator: 'FloStudios.ai',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@flostudiosai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}; 