'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const highlights = [
  { value: '1993', label: 'година на създаване' },
  { value: '54+', label: 'модела сгъваеми маси' },
  { value: '2-10 мм', label: 'шперплат от липа и топола' },
  { value: 'B2B', label: 'портал за търговци на едро' },
];

const panels = [
  {
    title: 'Собствено производство',
    text: 'Favo не препродава случайни продукти. Основните линии са произведени или подготвени в собствена база, което позволява контрол върху серия, материал и повторяемост.',
  },
  {
    title: 'Персонализация',
    text: 'Имена, надписи, табели, сувенири, подаръци за гости и сезонни колекции могат да се адаптират според конкретен повод или търговска серия.',
  },
  {
    title: 'Поръчки на едро',
    text: 'За магазини и партньори има отделен складов портал, търговски пакети и продуктови линии, които са удобни за регулярни наличности.',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[640px] h-[280px] rounded-full opacity-10"
          style={{ background: '#FF6B35', filter: 'blur(130px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className={`lg:col-span-5 rounded-card overflow-hidden border border-smoke/60 shadow-card-dark bg-charcoal transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative h-full min-h-[520px]">
              <AppImage
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                alt="Wood production and plywood materials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="tag-tangerine text-xs font-semibold px-3 py-1 rounded-pill">Производствена база</span>
                <h2 className="font-fraunces font-black text-title text-ice-white mt-5 mb-3">
                  Магазин, който стои върху реално производство.
                </h2>
                <p className="text-ice-white/58 leading-relaxed">
                  Това е ключовото доверие в e-commerce страницата: клиентът вижда продукти, но разбира и кой ги прави.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {highlights.map((item) => (
                <div key={item.label} className="rounded-card border border-smoke/60 bg-charcoal/70 p-5">
                  <div className="font-fraunces font-black text-2xl text-lager-gold">{item.value}</div>
                  <div className="text-xs text-ice-white/42 mt-2 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
              {panels.map((panel, index) => (
                <div
                  key={panel.title}
                  className={`rounded-card border border-smoke/60 bg-[#222] p-6 transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="w-10 h-10 rounded-full border border-lager-gold/35 text-lager-gold flex items-center justify-center mb-5">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-fraunces font-bold text-xl text-ice-white mb-3">{panel.title}</h3>
                  <p className="text-sm text-ice-white/55 leading-relaxed">{panel.text}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-card border border-lager-gold/30 bg-lager-gold/10 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <div className="text-xs text-lager-gold uppercase tracking-widest font-semibold mb-2">Портал за едро</div>
                <p className="font-fraunces text-2xl text-ice-white font-bold">sklad.favo-shop.com</p>
              </div>
              <a
                href="https://sklad.favo-shop.com"
                className="btn-shimmer text-white font-bold text-sm px-6 py-3 rounded-pill shadow-tangerine-glow text-center"
              >
                Към B2B портала →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
