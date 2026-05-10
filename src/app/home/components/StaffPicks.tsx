'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export interface StoreProduct {
  id: string;
  category: 'tables' | 'laser' | 'plywood' | 'seasonal';
  name: string;
  subtitle: string;
  price: string;
  euro: string;
  unitPrice: number;
  image: string;
  label: string;
  specs: string[];
  highlight?: boolean;
}

const filters = [
  { id: 'all', label: 'Всички' },
  { id: 'tables', label: 'Маси' },
  { id: 'laser', label: 'Лазерни' },
  { id: 'plywood', label: 'Шперплат' },
  { id: 'seasonal', label: 'Сезонни' },
] as const;

const products: StoreProduct[] = [
  {
    id: 'favo-3s-alu-pro',
    category: 'tables',
    name: 'FAVO 3S ALU PRO',
    subtitle: 'Алуминиева сгъваема маса',
    price: 'ок. 92 лв.',
    euro: '≈ 47.04 €',
    unitPrice: 92,
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88',
    label: 'Подарък инструмент',
    specs: ['лека конструкция', 'за улични продажби', 'лесен транспорт'],
    highlight: true,
  },
  {
    id: 'wooden-3s-pro',
    category: 'tables',
    name: 'FAVO 3S PRO',
    subtitle: 'Дървена тройна маса',
    price: 'ок. 62 лв.',
    euro: '≈ 31.70 €',
    unitPrice: 62,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    label: 'Флагман',
    specs: ['дървен плот', 'тройна конфигурация', 'за бит и търговия'],
  },
  {
    id: 'chess-table',
    category: 'tables',
    name: 'Маса 2 в 1 с шах',
    subtitle: 'Практична маса с игрови плот',
    price: 'ок. 70 лв.',
    euro: '≈ 35.79 €',
    unitPrice: 70,
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88',
    label: '2 в 1',
    specs: ['маса и игра', 'подходяща за подарък', 'сгъваема'],
  },
  {
    id: 'personalized-crate',
    category: 'laser',
    name: 'Персонализирана щайга',
    subtitle: 'Име, надпис или фирмен дизайн',
    price: 'от 3.52 лв.',
    euro: 'от 1.80 €',
    unitPrice: 3.52,
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09',
    label: 'По поръчка',
    specs: ['индивидуален дизайн', 'за подаръци', 'серийно производство'],
    highlight: true,
  },
  {
    id: 'bookmarks',
    category: 'laser',
    name: 'Книгоразделители',
    subtitle: 'Лазерно изрязани серии',
    price: '1.28-1.60 лв.',
    euro: '0.65-0.82 €',
    unitPrice: 1.6,
    image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044',
    label: 'Дребни подаръци',
    specs: ['сезонни дизайни', 'леки за доставка', 'подходящи на едро'],
  },
  {
    id: 'plywood-a4',
    category: 'plywood',
    name: 'Шперплат A4/A3',
    subtitle: 'Липа и топола 2-3 мм',
    price: 'от 5.90 лв.',
    euro: '≈ 3.02 €',
    unitPrice: 5.9,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    label: 'За моделизъм',
    specs: ['2 мм и 3 мм', 'A5 до A2', 'за лазер и макети'],
    highlight: true,
  },
  {
    id: 'plywood-1000',
    category: 'plywood',
    name: 'Шперплат 1000/600 мм',
    subtitle: 'Технически формат 2-10 мм',
    price: 'от 12.50 лв.',
    euro: '≈ 6.39 €',
    unitPrice: 12.5,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    label: 'Производство',
    specs: ['липа и топола', 'сертифицирани варианти', 'за работилници'],
  },
  {
    id: 'christmas-2025',
    category: 'seasonal',
    name: 'Коледа 2025',
    subtitle: 'Сувенири, украса и подаръци',
    price: 'от 1.17 лв.',
    euro: 'от 0.60 €',
    unitPrice: 1.17,
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf',
    label: 'Сезонна серия',
    specs: ['готови дизайни', 'персонализация', 'търговски пакети'],
  },
];

interface StaffPicksProps {
  onAddToCart: (product: StoreProduct) => void;
}

export default function StaffPicks({ onAddToCart }: StaffPicksProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['id']>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visibleProducts = useMemo(
    () => products.filter((product) => activeFilter === 'all' || product.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="staff-picks" ref={sectionRef} className="py-20 px-5 md:px-8 bg-charcoal/35 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lager-gold/35 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col xl:flex-row xl:items-end xl:justify-between gap-7 mb-9 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-lager-gold tracking-widest uppercase mb-4">
              Витрина
            </span>
            <h2 className="font-fraunces font-black text-display text-ice-white">
              Избрани продукти
            </h2>
            <p className="text-ice-white/50 text-lg max-w-2xl font-light mt-4">
              Продуктови карти с цена, евро ориентир, характеристики и директно добавяне в количката.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-pill border text-sm font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'border-tangerine/80 bg-tangerine/15 text-tangerine shadow-tangerine-glow'
                    : 'border-smoke/60 text-ice-white/60 hover:text-lager-gold hover:border-lager-gold/45'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {visibleProducts.map((product, index) => (
            <article
              key={product.id}
              className={`group relative rounded-card overflow-hidden border bg-[#202020] transition-all duration-500 hover:-translate-y-1 ${
                product.highlight ? 'border-tangerine/55 shadow-tangerine-glow' : 'border-smoke/60 hover:border-lager-gold/45'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="relative h-52 img-zoom">
                <AppImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-[#202020]/30 to-transparent" />
                <span className="absolute top-4 left-4 tag-gold text-xs font-semibold px-3 py-1 rounded-pill">
                  {product.label}
                </span>
              </div>

              <div className="p-5">
                <div className="min-h-[86px]">
                  <h3 className="font-fraunces font-bold text-xl text-ice-white leading-tight">{product.name}</h3>
                  <p className="text-sm text-ice-white/50 mt-1">{product.subtitle}</p>
                </div>

                <ul className="space-y-1.5 mb-5 min-h-[84px]">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-ice-white/58">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-zest" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between gap-3 mb-5">
                  <div>
                    <div className="font-fraunces font-black text-2xl text-tangerine">{product.price}</div>
                    <div className="text-xs text-ice-white/35">{product.euro}</div>
                  </div>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-lager-gold/35 text-lager-gold flex items-center justify-center transition-all group-hover:bg-lager-gold group-hover:text-grill-black"
                    aria-label={`Добави ${product.name}`}
                    onClick={() => onAddToCart(product)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-3 rounded-pill font-semibold text-sm transition-all ${
                    product.highlight
                      ? 'btn-shimmer text-white shadow-tangerine-glow'
                      : 'border border-smoke/70 text-ice-white hover:text-lager-gold hover:border-lager-gold/50'
                  }`}
                >
                  Добави в количката →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
