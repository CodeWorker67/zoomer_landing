/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        zoomer: {
          neon: '#3cff7a',
          'neon-bright': '#8fffab',
          'neon-dim': '#12a85c',
          green: '#39ff6e',
          cyan: '#4ae8c4',
          dark: '#080b0e',
          card: '#0f1419',
          border: 'rgba(57, 255, 120, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '28px',
        btn: '14px',
      },
      boxShadow: {
        card: '0 0 0 1px rgba(57, 255, 120, 0.1), 0 24px 48px rgba(0, 0, 0, 0.5)',
        neon: '0 4px 24px rgba(57, 255, 120, 0.32)',
      },
      animation: {
        'bg-shimmer': 'bgShimmer 22s ease-in-out infinite',
        'title-shimmer': 'titleShimmer 6s ease-in-out infinite',
      },
      keyframes: {
        bgShimmer: {
          '0%, 100%': { backgroundPosition: '0% 40%' },
          '50%': { backgroundPosition: '100% 55%' },
        },
        titleShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
