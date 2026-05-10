'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface ShopCategory {
  id: string;
  title: string;
  count: string;
  description: string;
  image: string;
  badge: string;
  accent: string;
}

const categories: ShopCategory[] = [
  {
    id: 'folding-tables',
    title: 'Сгъваеми маси',
    count: '54 продукта',
    description: 'Алуминиеви, дървени, двойни, тройни и промо комплекти за дома и улични продажби.',
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88',
    badge: 'Флагман',
    accent: '#FF6B35',
  },
  {
    id: 'laser',
    title: 'Лазерни изделия',
    count: 'най-голям избор',
    description: 'Имена, табели, подаръци, пъзели, сувенири, сезонни серии и индивидуални поръчки.',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09',
    badge: 'По поръчка',
    accent: '#C4D82E',
  },
  {
    id: 'plywood',
    title: 'Шперплат',
    count: '2-10 мм',
    description: 'Липа, топола, MDF формати и материали за моделизъм, лазерно рязане и гравиране.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    badge: 'Производител',
    accent: '#F5A623',
  },
  {
    id: 'seasonal',
    title: 'Сезонни колекции',
    count: 'Коледа 2025',
    description: 'Коледни сувенири, мартеници, Великден, 8 март, подаръци за гости и празници.',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf',
    badge: 'Ново',
    accent: '#FF6B35',
  },
];

export default function CategoryCardStacks() {
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
    <section id="packages" ref={sectionRef} className="py-20 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[360px] rounded-full opacity-10"
          style={{ background: '#F5A623', filter: 'blur(150px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-xs font-medium text-lime-zest tracking-widest uppercase">
              Онлайн магазин FAVO
            </span>
            <h2 className="font-fraunces font-black text-display text-ice-white mt-3">
              Пазарувайте по
              <span className="text-gold-gradient italic"> категория</span>
            </h2>
          </div>
          <p className="text-ice-white/50 text-lg max-w-xl font-light">
            Начална страница като каталог: бърз избор на продуктова линия, после конкретен продукт, количество или персонализация.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href="#staff-picks"
              className={`group relative min-h-[360px] rounded-card overflow-hidden border border-smoke/60 bg-charcoal shadow-card-dark transition-all duration-700 hover:-translate-y-1 hover:border-lager-gold/50 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppImage
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/70 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-pill border backdrop-blur-sm"
                  style={{ color: category.accent, borderColor: `${category.accent}70`, background: `${category.accent}20` }}
                >
                  {category.badge}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-xs text-ice-white/45 uppercase tracking-widest mb-2">{category.count}</div>
                <h3 className="font-fraunces font-bold text-2xl text-ice-white mb-2">{category.title}</h3>
                <p className="text-sm text-ice-white/58 leading-relaxed min-h-[84px]">{category.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm font-semibold" style={{ color: category.accent }}>
                  <span>Разгледай</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
