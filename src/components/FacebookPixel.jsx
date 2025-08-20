'use client';

import { useEffect } from 'react';
import useFacebookPixel from '@/hooks/useFacebookPixel';

export default function FacebookPixel() {
  const { trackPageView } = useFacebookPixel();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return null;
}
