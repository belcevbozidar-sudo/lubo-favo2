import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'FAVO — сгъваеми маси, лазерни изделия и шперплат',
  description: 'Favo е производител от Свищов на сгъваеми дървени и алуминиеви маси, лазерно изрязани изделия и шперплат от 2 мм до 10 мм.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>{children}
</body>
    </html>
  );
}
