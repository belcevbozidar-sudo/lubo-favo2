'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  onOpenCart: () => void;
}

const photos = [
{
  src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  alt: 'Woodworking tools and timber in a production workshop',
  rotate: '-8deg', top: '8%', left: '2%', width: 160, zIndex: 2, scale: 1
},
{
  src: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88",
  alt: 'Foldable wooden table in a warm interior setting',
  rotate: '5deg', top: '5%', left: '18%', width: 140, zIndex: 1, scale: 0.95
},
{
  src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  alt: 'Precision wood production details in an industrial space',
  rotate: '-3deg', top: '32%', right: '6%', width: 200, zIndex: 3, scale: 1.05,
  hero: true
},
{
  src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  alt: 'Sheets of plywood stacked for production and model making',
  rotate: '7deg', top: '10%', right: '16%', width: 145, zIndex: 2, scale: 1
},
{
  src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  alt: 'Wooden decor and finished home products on a table',
  rotate: '-6deg', top: '6%', right: '2%', width: 155, zIndex: 1, scale: 0.95
},
{
  src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  alt: 'Paint brushes and rollers arranged for home renovation',
  rotate: '4deg', top: '52%', left: '1%', width: 130, zIndex: 2, scale: 1
},
{
  src: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09",
  alt: 'Laser cut wood details and craft materials',
  rotate: '-5deg', top: '55%', right: '1%', width: 135, zIndex: 2, scale: 1
}];


export default function HeroSection({ onOpenCart }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const photos = containerRef.current.querySelectorAll<HTMLElement>('.photo-item');
      photos.forEach((el, i) => {
        const depth = i % 3 === 0 ? 12 : i % 3 === 1 ? 6 : 18;
        el.style.transform = `translate(${dx * depth}px, ${dy * depth}px) rotate(${el.dataset.rotate})`;
      });
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      style={{ background: 'linear-gradient(160deg, #1E1E1E 0%, #2A1A0A 50%, #1E1E1E 100%)' }}>
      
      {/* Atmospheric glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: '#F5A623', filter: 'blur(120px)' }} />
        
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: '#FF6B35', filter: 'blur(100px)' }} />
        
      </div>

      {/* UGC Photo Wall - desktop */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none select-none">
        {photos.map((photo, i) =>
        <div
          key={i}
          className={`photo-item photo-pin absolute ${photo.hero ? 'shadow-gold-glow' : 'shadow-card-dark'}`}
          data-rotate={photo.rotate}
          style={{
            top: photo.top,
            left: photo.left,
            right: photo.right,
            width: photo.hero ? 240 : photo.width,
            zIndex: photo.hero ? 5 : photo.zIndex,
            transform: `rotate(${photo.rotate}) scale(${photo.scale})`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            border: '4px solid #2A2A2A',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
          
            <AppImage
            src={photo.src}
            alt={photo.alt}
            width={photo.hero ? 240 : photo.width}
            height={photo.hero ? 320 : 180}
            className="w-full object-cover"
            style={{ filter: 'saturate(1.1) contrast(1.05)' } as React.CSSProperties} />
          
            {photo.hero &&
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="text-xs font-dm-sans text-lager-gold tracking-wider">Собствено производство</span>
              </div>
          }
          </div>
        )}
      </div>

      {/* Mobile photo strip */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-48 overflow-hidden flex gap-2 px-4 pt-20 opacity-40">
        {photos.slice(0, 4).map((photo, i) =>
        <div key={i} className="flex-shrink-0 w-28 h-36 overflow-hidden rounded border-2 border-smoke"
        style={{ transform: `rotate(${photo.rotate})` }}>
            <AppImage src={photo.src} alt={photo.alt} width={112} height={144} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-20 text-center px-5 max-w-5xl mx-auto mt-28 lg:mt-10">
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
