'use client';

import dynamic from 'next/dynamic';

// Load GeometricBackground only on client side to prevent hydration issues
const GeometricBackground = dynamic(() => import('./GeometricBackground'), {
  ssr: false,
});

export default function ClientGeometricBackground() {
  return <GeometricBackground />;
}
