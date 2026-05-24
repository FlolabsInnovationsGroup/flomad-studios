import { generateOgImage } from '@/lib/og-image';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'FloStudios.ai';
  const description =
    searchParams.get('description') ??
    'AI-powered creative learning, podcasts, videos, and innovative content for the next generation of technology.';
  const subtitle = searchParams.get('subtitle') ?? undefined;
  const variant = searchParams.get('variant') === 'hero' ? 'hero' : 'page';

  return generateOgImage({ title, description, subtitle, variant });
}
