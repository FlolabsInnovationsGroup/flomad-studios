import { generateOgImage } from '@/lib/og-image';

export const alt = 'FloStudios.ai - AI-Powered Creative Learning';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return generateOgImage({
    variant: 'hero',
    title: 'FloStudios.ai',
    description:
      'Where AI meets creativity. A learning-focused division of FloLabs Innovations Group, creating AI-enhanced content and experiences for cutting-edge technology education.',
    subtitle: 'AI-Powered Creative Learning',
    primaryLabel: "Let's Talk",
    secondaryLabel: 'View Our Work',
  });
}
