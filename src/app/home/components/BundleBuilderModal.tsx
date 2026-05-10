'use client';

import React, { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  euro: string;
  unitPrice: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('bg-BG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function CartDrawer({
  isOpen,
  items = [],
  onClose,
  onUpdateQuantity = () => {},
  onRemove = () => {},
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Количка">
      <button
        type="button"
        className="absolute inset-0 modal-backdrop bg-grill-black/70"
        onClick={onClose}
        aria-label="Затвори количката"
      />

      <aside
        className="absolute right-0 top-0 h-full w-full max-w-[440px] border-l border-smoke/60 shadow-card-dark flex flex-col"
        style={{ background: 'linear-gradient(160deg, #2A2A2A 0%, #1E1E1E 100%)' }}
      >
        <div className="px-6 py-5 border-b border-smoke/45 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-lager-gold uppercase tracking-widest font-semibold">FAVO магазин</p>
            <h2 className="font-fraunces font-bold text-2xl text-ice-white">Количка</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-smoke/60 flex items-center justify-center text-ice-white/65 hover:text-ice-white hover:bg-smoke transition-colors"
            aria-label="Затвори"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="w-16 h-16 rounded-full border border-lager-gold/35 text-lager-gold flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M3 4h2l2.4 11.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H7" />
              </svg>
            </div>
            <h3 className="font-fraunces text-2xl font-bold text-ice-white mb-2">Количката е празна</h3>
            <p className="text-sm text-ice-white/48 leading-relaxed">
              Добавете маси, шперплат или лазерни изделия от продуктовата витрина.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-card border border-smoke/55 bg-charcoal/60 p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-smoke/50">
                      <AppImage src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-fraunces font-bold text-lg text-ice-white leading-tight">{item.name}</h3>
                          <p className="text-xs text-ice-white/45 mt-1">{item.subtitle}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="text-ice-white/35 hover:text-tangerine transition-colors"
                          aria-label={`Премахни ${item.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <div className="text-tangerine font-fraunces font-black text-xl">
                            {formatPrice(item.unitPrice * item.quantity)} лв.
                          </div>
                          <div className="text-xs text-ice-white/35">{item.price} · {item.euro}</div>
                        </div>

                        <div className="flex items-center rounded-pill border border-smoke/70 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 text-ice-white/65 hover:text-lager-gold hover:bg-smoke/45 transition-colors"
                            aria-label={`Намали ${item.name}`}
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-sm font-semibold text-ice-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 text-ice-white/65 hover:text-lager-gold hover:bg-smoke/45 transition-colors"
                            aria-label={`Увеличи ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-smoke/45 p-5 bg-grill-black/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ice-white/50">Продукти</span>
                <span className="text-sm text-ice-white/75">{totalItems}</span>
              </div>
              <div className="flex items-end justify-between mb-5">
                <span className="font-fraunces font-bold text-xl text-ice-white">Общо</span>
                <span className="font-fraunces font-black text-3xl text-tangerine">{formatPrice(subtotal)} лв.</span>
              </div>
              <button type="button" className="btn-shimmer text-white font-bold text-base w-full py-4 rounded-pill shadow-tangerine-glow">
                Продължи към поръчка →
              </button>
              <p className="text-xs text-ice-white/35 text-center mt-3">
                Финалната доставка и наличност се потвърждават при завършване на поръчката.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
