import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const year = new Date()?.getFullYear();

  return (
    <footer className="border-t border-smoke/40 py-10 px-5 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <AppLogo src="" text="FAVO" iconName="CubeTransparentIcon" size={24} className="text-lager-gold" />
          <span className="text-sm text-ice-white/40">© {year}</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-ice-white/50">
          {[
            { label: 'Категории', href: '#packages' },
            { label: 'Продукти', href: '#staff-picks' },
            { label: 'Поръчка', href: '#how-it-works' },
            { label: 'Сайт', href: 'https://favo-shop.com' },
            { label: 'Контакт', href: 'mailto:sales@favo-shop.com' },
          ]?.map((l) => (
            <a key={l.label} href={l.href}
              className="hover:text-lager-gold transition-colors duration-200 focus:outline-none focus:text-lager-gold">
              {l.label}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="flex items-center gap-4 text-xs text-ice-white/30">
          <a href="tel:+359889500937" className="hover:text-ice-white/60 transition-colors">0889 500 937</a>
          <span>·</span>
          <a href="mailto:sales@favo-shop.com" className="hover:text-ice-white/60 transition-colors">sales@favo-shop.com</a>
        </div>
      </div>
    </footer>
  );
}
