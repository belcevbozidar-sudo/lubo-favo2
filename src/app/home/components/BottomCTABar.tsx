'use client';

import React, { useEffect, useState } from 'react';

interface BottomCTABarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function BottomCTABar({ onOpenCart, cartCount }: BottomCTABarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`bottom-cta-bar fixed bottom-0 left-0 right-0 z-50 ${visible ? 'visible' : ''}`}
      aria-hidden={!visible}
    >
      <div
        className="border-t border-smoke/50 backdrop-blur-md px-5 py-4 flex items-center justify-between gap-4"
        style={{ background: 'rgba(30,30,30,0.96)' }}
      >
        {/* Left: urgency */}
        <div className="hidden sm:block">
          <p className="text-xs font-medium text-lager-gold tracking-wide">
            Производство, магазин и поръчки на едро
          </p>
          <p className="text-xs text-ice-white/40">
            Свищов, ул. Петър Парчевич 5 · 08:00-17:00
          </p>
        </div>

        {/* Center: quick stats */}
        <div className="hidden md:flex items-center gap-5 text-xs text-ice-white/40">
          <span>✓ Собствено производство</span>
          <span>✓ Персонализация</span>
          <span>✓ Портал за едро</span>
        </div>

        {/* Right: CTA */}
        <button
          onClick={onOpenCart}
          className="btn-shimmer text-white font-bold text-sm px-7 py-3.5 rounded-pill shadow-tangerine-glow hover:scale-105 active:scale-95 transition-transform flex-shrink-0 w-full sm:w-auto"
        >
          Отвори количката ({cartCount}) →
        </button>
      </div>
    </div>
  );
}
