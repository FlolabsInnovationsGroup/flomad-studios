import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

const STARS: Array<[number, number, number]> = [
  [6, 10, 2], [14, 18, 3], [22, 8, 2], [31, 14, 2], [38, 6, 3], [48, 12, 2],
  [58, 9, 2], [67, 16, 3], [74, 7, 2], [82, 13, 2], [91, 10, 3], [96, 20, 2],
  [10, 28, 2], [19, 34, 2], [28, 26, 3], [42, 32, 2], [53, 24, 2], [61, 30, 3],
  [72, 28, 2], [88, 34, 2], [5, 42, 2], [35, 38, 2], [50, 44, 3], [78, 40, 2],
  [93, 48, 2], [16, 52, 2], [44, 50, 2], [62, 46, 2], [85, 52, 3],
];

let cachedLogoDataUri: string | null = null;

function getLogoDataUri(): string {
  if (cachedLogoDataUri) return cachedLogoDataUri;
  const logoPath = join(process.cwd(), 'public', 'images', 'flomadlogo.svg');
  const svg = readFileSync(logoPath, 'utf8');
  cachedLogoDataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return cachedLogoDataUri;
}

export interface OgImageOptions {
  title: string;
  description: string;
  subtitle?: string;
  variant?: 'hero' | 'page';
  primaryLabel?: string;
  secondaryLabel?: string;
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function buildOgImageUrl({
  title,
  description,
  subtitle,
  variant = 'page',
}: OgImageOptions): string {
  const params = new URLSearchParams({ title, description, variant });
  if (subtitle) params.set('subtitle', subtitle);
  return `/api/og?${params.toString()}`;
}

export function generateOgImage({
  title,
  description,
  subtitle,
  variant = 'page',
  primaryLabel = "Let's Talk",
  secondaryLabel = 'View Our Work',
}: OgImageOptions): ImageResponse {
  const logoSrc = getLogoDataUri();
  const isHero = variant === 'hero';
  const displayTitle = truncate(
    title.replace(/\s*\|\s*FloStudios\.ai$/i, '').trim() || 'FloStudios.ai',
    isHero ? 40 : 60
  );
  const displayDescription = truncate(description, isHero ? 140 : 160);

  const starNodes = STARS.map(([x, y, size], i) => (
    <div
      key={`star-${i}`}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: i % 3 === 0 ? 'rgba(255, 248, 220, 0.95)' : 'rgba(255, 255, 255, 0.9)',
      }}
    />
  ));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          background: 'linear-gradient(180deg, #020617 0%, #1e1b4b 50%, #0f172a 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse 120% 70% at 65% 25%, rgba(147, 197, 253, 0.25) 0%, transparent 60%), radial-gradient(ellipse 90% 50% at 45% 45%, rgba(196, 181, 253, 0.16) 0%, transparent 50%)',
          }}
        />
        {starNodes}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 130,
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 248, 240, 0.4) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 64,
            right: 148,
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #fed7aa 100%)',
            boxShadow: '0 0 48px rgba(255, 248, 240, 0.6)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 48,
            paddingRight: 48,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(15, 23, 42, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logoSrc}
              width={36}
              height={36}
              alt="FloStudios.ai logo"
              style={{ marginRight: 12 }}
            />
            <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff' }}>
              FloStudios.ai
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
            paddingTop: 48,
            paddingBottom: 40,
            paddingLeft: 64,
            paddingRight: 64,
            textAlign: 'center',
          }}
        >
          {subtitle ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 22,
                paddingRight: 22,
                borderRadius: 999,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                marginBottom: 24,
                fontSize: 18,
                fontWeight: 600,
                color: '#7dd3fc',
              }}
            >
              {truncate(subtitle, 50)}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: isHero ? 68 : displayTitle.length > 28 ? 48 : 56,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 20,
              color: '#f0f9ff',
              letterSpacing: '-0.02em',
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: isHero ? 22 : 24,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.45,
              maxWidth: 860,
              marginBottom: isHero ? 32 : 0,
            }}
          >
            {displayDescription}
          </div>
          {isHero ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 12,
                  background: 'linear-gradient(90deg, #38bdf8, #3b82f6)',
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: 600,
                  marginRight: 16,
                }}
              >
                {primaryLabel}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {secondaryLabel}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
