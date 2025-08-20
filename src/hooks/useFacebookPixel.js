'use client';

import { useEffect, useState } from 'react';

const useFacebookPixel = () => {
  const [pixel, setPixel] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      const ReactPixel = require('react-facebook-pixel');
      
      // Inicializa o Pixel se ainda não estiver inicializado
      if (!window.fbq) {
        ReactPixel.default.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, {
          autoConfig: true,
          debug: process.env.NODE_ENV === 'development',
        });
      }
      
      setPixel(ReactPixel.default);
    }
  }, []);

  // Função para rastrear eventos personalizados
  const trackEvent = (eventName, data = {}) => {
    if (pixel) {
      pixel.track(eventName, data);
    }
  };

  // Função para rastrear conversões
  const trackCustom = (eventName, data = {}) => {
    if (pixel) {
      pixel.trackCustom(eventName, data);
    }
  };

  // Função para rastrear visualizações de página
  const trackPageView = () => {
    if (pixel) {
      pixel.pageView();
    }
  };

  return { trackEvent, trackCustom, trackPageView };
};

export default useFacebookPixel;
