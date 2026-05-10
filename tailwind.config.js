/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'grill-black':  '#1E1E1E',
        'lager-gold':   '#F5A623',
        'tangerine':    '#FF6B35',
        'ice-white':    '#F9FAFB',
        'lime-zest':    '#C4D82E',
        'charcoal':     '#2A2A2A',
        'smoke':        '#3D3D3D',
        'ash':          '#555555',
        'ember':        '#FF3D00',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'title':   ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        'card': '1.25rem',
        'pill': '9999px',
      },
      boxShadow: {
        'card-dark': '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
        'card-glow': '0 8px 40px rgba(245,166,35,0.2), 0 2px 8px rgba(0,0,0,0.4)',
        'tangerine-glow': '0 0 30px rgba(255,107,53,0.4)',
        'gold-glow': '0 0 30px rgba(245,166,35,0.4)',
        'lime-glow': '0 0 20px rgba(196,216,46,0.3)',
      },
      backgroundImage: {
        'gold-gradient':   'linear-gradient(135deg, #F5A623 0%, #FFD166 50%, #F5A623 100%)',
        'dark-gradient':   'linear-gradient(180deg, #1E1E1E 0%, #2A2A2A 100%)',
        'smoke-gradient':  'linear-gradient(135deg, #2A2A2A 0%, #1E1E1E 100%)',
        'tangerine-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FF3D00 100%)',
      },
      animation: {
        'float': 'floatBob 3s ease-in-out infinite',
        'glow':  'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'sizzle': 'sizzle 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};