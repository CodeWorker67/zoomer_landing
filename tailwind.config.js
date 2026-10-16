/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        happ: {
          blue: '#2FE06A',
          'blue-hover': '#4AF07D',
          ink: '#F4FFF7',
          muted: '#C5D9CC',
          faint: '#8FA899',
          gray: '#0E1611',
          dark: '#070B08',
          footer: '#0A100C',
        },
        zoomer: {
          neon: '#2FE06A',
          'neon-bright': '#4AF07D',
          'neon-dim': '#1FA94F',
          green: '#2FE06A',
          cyan: '#2FE06A',
          dark: '#070B08',
          card: '#0E1611',
          border: '#56d68421',
        },
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        pill: '980px',
        card: '22px',
        btn: '16px',
      },
    },
  },
  plugins: [],
};
