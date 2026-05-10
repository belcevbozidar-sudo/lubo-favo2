'use client';

import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Избирате продукт',
    description: 'Преглеждате категорията, сравнявате моделите и избирате дали става дума за готов продукт, материал или персонализирана изработка.',
    tag: 'Каталог',
  },
  {
    number: '02',
    title: 'Уточнявате количество',
    description: 'За маси и шперплат водещи са модел, размер и брой. За лазерни изделия - дизайн, материал, срок и дали поръчката е единична или серийна.',
    tag: 'Детайли',
  },
  {
    number: '03',
    title: 'Получавате потвърждение',
    description: 'Екипът на Favo потвърждава наличност, цена и срок. За B2B клиенти може да се използва отделният складов портал.',
    tag: 'Поръчка',
  },
];

export default function HowItWorks() {
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
    <section id="how-it-works" ref={sectionRef} className="py-20 px-5 md:px-8 bg-charcoal/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-smoke/60 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs text-lime-zest font-medium tracking-widest uppercase">Покупка без излишно търсене</span>
          <h2 className="font-fraunces font-black text-display text-ice-white mt-3">
            Как се поръчва
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`rounded-card p-7 border border-smoke/60 bg-[#222] relative overflow-hidden transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full opacity-10"
                style={{ background: index === 1 ? '#FF6B35' : '#F5A623', filter: 'blur(55px)', transform: 'translate(30%, -30%)' }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <span className="font-fraunces font-black text-6xl text-lager-gold/20 leading-none">
                    {step.number}
                  </span>
                  <span className={index === 1 ? 'tag-tangerine text-xs px-3 py-1 rounded-pill font-medium' : 'tag-gold text-xs px-3 py-1 rounded-pill font-medium'}>
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-fraunces font-bold text-2xl text-ice-white mb-3">{step.title}</h3>
                <p className="text-ice-white/58 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
