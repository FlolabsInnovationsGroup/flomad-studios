/**
 * Enhanced Metadata Utility for SEO and LLMO
 * Provides consistent metadata across the site optimized for search engines
 * and Large Language Model understanding
 */

import { Metadata } from 'next';

interface EnhancedMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'video.other' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

export function generateEnhancedMetadata({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: EnhancedMetadataProps): Metadata {
  const baseUrl = 'https://www.flostudios.ai';
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      'FloStudios.ai',
      'AI creative learning',
      'artificial intelligence',
      'Flo Labs',
      'experiential learning',
      'content creation',
      'AI education',
      'robotics',
      'podcasts',
      'videos',
      'creative studio',
      ...(tags || []),
    ],
    authors: authors?.map(name => ({ name })) || [{ name: 'FloStudios.ai' }],
    creator: 'FloStudios.ai',
    publisher: 'FloStudios.ai',
    applicationName: 'FloStudios.ai',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'FloStudios.ai',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(type === 'article' && publishedTime && {
        publishedTime,
        ...(modifiedTime && { modifiedTime }),
        ...(authors && { authors }),
        ...(tags && { tags }),
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@flostudiosai',
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

// Predefined metadata templates for common pages
export const homeMetadata = generateEnhancedMetadata({
  title: 'FloStudios.ai | AI-Powered Creative Learning Platform',
  description:
    'FloStudios.ai is the AI-focused creative learning division of Flomad Labs R&D. Learn through hands-on projects in AI, robotics, and emerging technologies. Create podcasts, videos, and digital content while mastering cutting-edge AI tools.',
  path: '/',
  tags: [
    'AI learning platform',
    'creative education',
    'AI internship',
    'robotics education',
    'content creation training',
    'experiential learning',
  ],
});

export const aboutMetadata = generateEnhancedMetadata({
  title: 'About FloStudios.ai | AI Creative Learning Division',
  description:
    'Learn about FloStudios.ai - the AI-focused creative learning division of Flomad Labs R&D. We empower emerging talent through experiential learning with AI, brainwriting, LLMs, and hands-on projects in cutting-edge technology.',
  path: '/about',
  tags: [
    'about us',
    'AI education',
    'learning methodology',
    'Flo Labs',
    'experiential learning',
  ],
});

export const servicesMetadata = generateEnhancedMetadata({
  title: 'Our Services | FloStudios.ai AI Learning Programs',
  description:
    'Explore FloStudios.ai AI-powered creative learning services across Education, Healthcare, Travel, and Space verticals. Gain hands-on experience with AI technology, content creation, and digital innovation.',
  path: '/services',
  tags: [
    'AI services',
    'education programs',
    'healthcare AI',
    'travel technology',
    'space innovation',
  ],
});

export const workMetadata = generateEnhancedMetadata({
  title: 'Our Work | FloStudios.ai Student Projects & Portfolio',
  description:
    'View FloStudios.ai student projects including CAIPO.ai, MoodChanger.ai, Flo Travel, and RoboCollective. See how our students create AI-powered websites, apps, and digital experiences through experiential learning.',
  path: '/work',
  tags: [
    'student projects',
    'AI portfolio',
    'CAIPO',
    'MoodChanger',
    'student work showcase',
  ],
});

export const videosMetadata = generateEnhancedMetadata({
  title: 'Videos | FloStudios.ai AI Learning Content',
  description:
    'Watch FloStudios.ai educational videos on AI, robotics, and emerging technologies. Student-created content showcasing AI projects, tutorials, and innovative technology demonstrations.',
  path: '/videos',
  type: 'video.other',
  tags: ['AI videos', 'educational content', 'tutorials', 'student videos'],
});

export const podcastsMetadata = generateEnhancedMetadata({
  title: 'The Flo Frequency Podcast | FloStudios.ai',
  description:
    'Listen to The Flo Frequency - FloStudios.ai official podcast featuring AI experts, robotics innovators, and technology leaders. Deep conversations about artificial intelligence, creative technology, and the future of learning.',
  path: '/podcasts',
  tags: [
    'AI podcast',
    'technology podcast',
    'Flo Frequency',
    'robotics discussions',
  ],
});

export const contactMetadata = generateEnhancedMetadata({
  title: 'Contact FloStudios.ai | Get In Touch',
  description:
    'Contact FloStudios.ai to learn about AI-powered creative learning programs, internships, and collaboration opportunities. Part of the Flomad Labs R&D ecosystem.',
  path: '/contact',
  tags: ['contact', 'get in touch', 'inquiries', 'collaboration'],
});

export const joinMetadata = generateEnhancedMetadata({
  title: 'Join FloStudios.ai | AI Learning Programs & Internships',
  description:
    'Join FloStudios.ai experiential learning programs. Gain hands-on experience in AI, robotics, content creation, and emerging technologies. Apply today for flexible, affordable learning opportunities.',
  path: '/join',
  tags: [
    'join us',
    'apply',
    'internships',
    'AI learning programs',
    'student opportunities',
  ],
});
