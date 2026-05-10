'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Header({ onOpenCart, cartCount }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Категории', href: '#packages' },
    { label: 'Продукти', href: '#staff-picks' },
    { label: 'Поръчка', href: '#how-it-works' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-grill-black/95 backdrop-blur-md border-b border-smoke/50 py-3' :'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <AppLogo
            src=""
            text="FAVO"
            iconName="CubeTransparentIcon"
            size={32}
            className="text-lager-gold"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ice-white/70 hover:text-lager-gold transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+359889500937"
            className="hidden md:flex items-center gap-1.5 text-sm text-ice-white/60 hover:text-lager-gold transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            0889 500 937
          </a>
          <button
            onClick={onOpenCart}
            className="btn-shimmer text-white font-semibold text-sm px-5 py-2.5 rounded-pill shadow-tangerine-glow transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Количка
            <span className="min-w-5 h-5 px-1 rounded-full bg-grill-black/45 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-ice-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal/98 backdrop-blur-md border-t border-smoke/50 px-5 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-ice-white/80 hover:text-lager-gold transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onOpenCart(); }}
            className="btn-shimmer text-white font-semibold text-sm px-5 py-3 rounded-pill w-full mt-2"
          >
            Количка ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
}
