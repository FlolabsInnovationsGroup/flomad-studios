import { Metadata } from 'next';

export const siteConfig = {
  name: 'Flomad Studios',
  description: 'Creative content, podcasts, videos, and more.',
  url: 'https://www.flomadstudios.com',
  ogImage: 'https://www.flomadstudios.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/flomadstudios',
    instagram: 'https://instagram.com/flomadstudios',
    youtube: 'https://youtube.com/flomadstudios',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['creative', 'content', 'podcasts', 'videos', 'studio', 'media'],
  authors: [{ name: 'Flomad Studios' }],
  creator: 'Flomad Studios',
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
    creator: '@flomadstudios',
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