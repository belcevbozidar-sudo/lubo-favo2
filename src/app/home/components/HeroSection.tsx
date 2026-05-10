'use client';

import React, { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  onOpenCart: () => void;
}

const img = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=68`;

const desktopPhotos = [
  {
    src: img('photo-1562259949-e8e7689d7828', 360),
    alt: 'Paint roller and renovation tools',
    rotate: '-7deg',
    top: '10%',
    left: '3%',
    width: 180,
    height: 140,
    zIndex: 2,
  },
  {
    src: img('photo-1601058268499-e52658b8bb88', 380),
    alt: 'Foldable wooden table in a warm interior setting',
    rotate: '5deg',
    top: '34%',
    left: '7%',
    width: 178,
    height: 230,
    zIndex: 3,
  },
  {
    src: img('photo-1519710164239-da123dc03ef4', 340),
    alt: 'Finished wooden home products',
    rotate: '-5deg',
    bottom: '7%',
    left: '4%',
    width: 158,
    height: 190,
    zIndex: 2,
  },
  {
    src: img('photo-1562259929-b4e1fd3aef09', 360),
    alt: 'Laser cut wood details and craft materials',
    rotate: '6deg',
    top: '11%',
    right: '4%',
    width: 178,
    height: 145,
    zIndex: 2,
  },
  {
    src: img('photo-1503387762-592deb58ef4e', 460),
    alt: 'Precision wood production details in an industrial space',
    rotate: '-4deg',
    top: '37%',
    right: '7%',
    width: 220,
    height: 285,
    zIndex: 4,
    hero: true,
  },
  {
    src: img('photo-1503387762-592deb58ef4e', 340),
    alt: 'Sheets of plywood stacked for production',
    rotate: '7deg',
    bottom: '8%',
    right: '5%',
    width: 160,
    height: 190,
    zIndex: 2,
  },
];

const mobilePhotos = [
  {
    src: img('photo-1562259949-e8e7689d7828', 260),
    alt: 'Paint roller and renovation tools',
    rotate: '-7deg',
    top: '78px',
    left: '-18px',
    width: 118,
    height: 94,
  },
  {
    src: img('photo-1601058268499-e52658b8bb88', 300),
    alt: 'Foldable wooden table',
    rotate: '4deg',
    top: '82px',
    right: '-14px',
    width: 128,
    height: 104,
  },
  {
    src: img('photo-1503387762-592deb58ef4e', 320),
    alt: 'Wood production details',
    rotate: '-3deg',
    bottom: '92px',
    left: '50%',
    width: 148,
    height: 112,
    translateX: '-50%',
  },
];

export default function HeroSection({ onOpenCart }: HeroSectionProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      style={{ background: 'linear-gradient(160deg, #1E1E1E 0%, #2A1A0A 50%, #1E1E1E 100%)' }}>
      
      {/* Atmospheric glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[320px] md:w-[500px] h-[320px] md:h-[500px] rounded-full opacity-10 md:opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.55) 0%, rgba(245,166,35,0.18) 38%, transparent 70%)' }} />
        
        <div
          className="absolute bottom-1/4 right-1/4 w-[260px] md:w-[400px] h-[260px] md:h-[400px] rounded-full opacity-8 md:opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.52) 0%, rgba(255,107,53,0.16) 40%, transparent 72%)' }} />
        
      </div>

      {isDesktop === true && (
        <div className="absolute inset-0 pointer-events-none select-none">
          {desktopPhotos.map((photo, i) =>
          <div
            key={i}
            className={`photo-pin absolute ${photo.hero ? 'shadow-gold-glow' : 'shadow-card-dark'}`}
            style={{
              top: photo.top,
              bottom: photo.bottom,
              left: photo.left,
              right: photo.right,
              width: photo.width,
              height: photo.height,
              zIndex: photo.zIndex,
              transform: `rotate(${photo.rotate})`,
              border: '4px solid #2A2A2A',
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: photo.hero ? 0.92 : 0.86,
            }}>
            
              <AppImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(1.05) contrast(1.03)' } as React.CSSProperties} />
            
              {photo.hero &&
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <span className="text-xs font-dm-sans text-lager-gold tracking-wider">Собствено производство</span>
                </div>
            }
            </div>
          )}
        </div>
      )}

      {isDesktop === false && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-55">
          {mobilePhotos.map((photo, i) => (
            <div
              key={i}
              className="photo-pin absolute shadow-card-dark"
              style={{
                top: photo.top,
                bottom: photo.bottom,
                left: photo.left,
                right: photo.right,
                width: photo.width,
                height: photo.height,
                transform: `translateX(${photo.translateX ?? '0'}) rotate(${photo.rotate})`,
                border: '3px solid #2A2A2A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <AppImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-20 text-center px-5 max-w-5xl mx-auto mt-24 xl:mt-10">
        {/* Main headline */}
        <h1 className="font-fraunces font-black text-hero text-ice-white leading-none mb-4 animate-in delay-100">
          Сгъваеми маси.
          <br />
          <span className="text-gold-gradient italic">Лазерни изделия.</span>
          <br />
          <span className="relative inline-block">
            Шперплат.
            {/* Underline sizzle */}
            <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full animate-sizzle"
            style={{ background: 'linear-gradient(90deg, transparent, #FF6B35, #F5A623, transparent)' }} />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-ice-white/60 font-dm-sans font-light max-w-xl mx-auto leading-relaxed mt-6 mb-10 animate-in delay-200">
          Favo е производствена фирма с онлайн продажби: водещ европейски производител на сгъваеми дървени и алуминиеви маси, лазерно изрязани изделия и технически шперплат за работа, търговия и творчество.
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-lager-gold/30 bg-lager-gold/10 backdrop-blur-sm mb-8 animate-in delay-200">
          <span className="w-2 h-2 rounded-full bg-lime-zest animate-pulse" />
          <span className="text-xs font-medium text-lager-gold tracking-widest uppercase">
            Производител от 1993 г. — Свищов, България
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in delay-300">
          <button
            onClick={onOpenCart}
            className="btn-shimmer text-white font-bold text-base px-8 py-4 rounded-pill shadow-tangerine-glow hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto">
            
            Отвори количката →
          </button>
          <a
            href="#staff-picks"
            className="flex items-center gap-2 text-base font-medium text-ice-white/70 hover:text-lager-gold transition-colors border border-smoke/60 hover:border-lager-gold/40 px-8 py-4 rounded-pill backdrop-blur-sm w-full sm:w-auto justify-center">
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Виж топ предложения
          </a>
        </div>

        {/* Social proof strip */}
        <div className="flex items-center justify-center gap-6 mt-12 animate-in delay-400">
          <div className="text-center">
            <div className="font-fraunces font-bold text-2xl text-lager-gold">1993</div>
            <div className="text-xs text-ice-white/40 tracking-wider">Начало</div>
          </div>
          <div className="w-px h-10 bg-smoke/60" />
          <div className="text-center">
            <div className="font-fraunces font-bold text-2xl text-lager-gold">54+</div>
            <div className="text-xs text-ice-white/40 tracking-wider">Модела маси</div>
          </div>
          <div className="w-px h-10 bg-smoke/60" />
          <div className="text-center">
            <div className="font-fraunces font-bold text-2xl text-lager-gold">2-10 мм</div>
            <div className="text-xs text-ice-white/40 tracking-wider">Шперплат</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs text-ice-white/30 tracking-widest uppercase">Надолу</span>
        <div className="w-px h-12 bg-gradient-to-b from-lager-gold/60 to-transparent" />
      </div>
    </section>);

}
