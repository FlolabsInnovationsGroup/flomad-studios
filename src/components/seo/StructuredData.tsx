/**
 * Structured Data (JSON-LD) Components for SEO and LLMO
 * These components generate Schema.org markup for better search engine understanding
 * and Large Language Model Optimization (LLMO)
 */

import Script from 'next/script';

interface OrganizationProps {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

export function OrganizationSchema({ 
  name, 
  url, 
  logo, 
  description,
  sameAs = [],
  address,
  contactPoint 
}: OrganizationProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    ...(description && { description }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    ...(contactPoint && { contactPoint: { '@type': 'ContactPoint', ...contactPoint } }),
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VideoObjectProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}

export function VideoObjectSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate,
  contentUrl,
  embedUrl,
  duration 
}: VideoObjectProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
  };

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CreativeWorkProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
}

export function CreativeWorkSchema({
  name,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: CreativeWorkProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    ...(image && { image }),
    ...(author && { 
      author: { 
        '@type': 'Person', 
        name: author.name,
        ...(author.url && { url: author.url })
      } 
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  return (
    <Script
      id="creative-work-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteProps {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export function WebSiteSchema({ name, url, description, potentialAction }: WebSiteProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    ...(description && { description }),
    ...(potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: potentialAction.target,
        'query-input': potentialAction.queryInput,
      },
    }),
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CourseProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  url?: string;
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
  };
}

export function CourseSchema({ name, description, provider, url, aggregateRating }: CourseProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      sameAs: provider.url,
    },
    ...(url && { url }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
      },
    }),
  };

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
