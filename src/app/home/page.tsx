'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import CategoryCardStacks from './components/CategoryCardStacks';
import StaffPicks from './components/StaffPicks';
import TestimonialsSection from './components/TestimonialsSection';
import HowItWorks from './components/HowItWorks';
import CartDrawer, { CartItem } from './components/BundleBuilderModal';
import BottomCTABar from './components/BottomCTABar';
import { StoreProduct } from './components/StaffPicks';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: StoreProduct) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...items,
        {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          euro: product.euro,
          unitPrice: product.unitPrice,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-grill-black text-ice-white font-dm-sans overflow-x-hidden">
      <Header onOpenCart={openCart} cartCount={cartCount} />
      <main>
        <HeroSection onOpenCart={openCart} />

        {/* Divider sizzle line */}
        <div className="relative h-px mx-8 md:mx-16 my-0">
          <div className="absolute inset-0 animate-sizzle rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #FF6B35 30%, #F5A623 60%, transparent 100%)' }} />
        </div>

        <CategoryCardStacks />

        {/* Shop promo strip */}
        <section className="px-5 md:px-8 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ['Двойни цени', 'Ориентири в лева и евро за по-лесно сравнение'],
              ['Промо комплекти', 'Отстъпки за комплекти маси и търговски пакети'],
              ['Персонализация', 'Имена, лога, табели и сувенири по задание'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-card border border-smoke/60 bg-charcoal/55 px-5 py-4 flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-lime-zest flex-shrink-0" />
                <div>
                  <div className="font-semibold text-ice-white">{title}</div>
                  <div className="text-sm text-ice-white/45 mt-1">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <StaffPicks onAddToCart={addToCart} />

        <TestimonialsSection />

        <HowItWorks />

        {/* Final CTA banner */}
        <section className="py-24 px-5 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #2A1A0A 0%, #1E1E1E 40%, #1A200A 100%)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20"
              style={{ background: '#F5A623', filter: 'blur(100px)' }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">▣ ✦ ▤</div>
            <h2 className="font-fraunces font-black text-display text-ice-white mb-4">
              Готови сте да поръчате?
              <br />
              <span className="text-gold-gradient italic">Добавете продуктите в количката.</span>
            </h2>
            <p className="text-lg text-ice-white/50 font-light max-w-lg mx-auto mb-10 leading-relaxed">
              Изберете продуктите, коригирайте количествата от страничната количка и продължете към поръчка.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openCart}
                className="btn-shimmer text-white font-bold text-lg px-10 py-5 rounded-pill shadow-tangerine-glow hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
              >
                Отвори количката →
              </button>
              <div className="flex items-center gap-2 text-sm text-ice-white/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {cartCount} продукта в количката
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-ice-white/30">
              {['Свищов', 'Производство от 1993 г.', '0889 500 937', 'sales@favo-shop.com', 'Пн-Пт 08:00-17:00']?.map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-lime-zest" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* Persistent bottom CTA */}
      <BottomCTABar onOpenCart={openCart} cartCount={cartCount} />
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
      {/* Bottom padding for the persistent bar */}
      <div className="h-20" />
    </div>
  );
}
