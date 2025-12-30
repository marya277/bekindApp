/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
       brand: {
          primary: '#00A896',      
          'primary-dark': '#008C7A',
          'primary-light': '#02C9B5',
          navy: '#2B4C6F',         
          'navy-dark': '#1E3A5F',  
          'navy-light': '#3A5F8F',
        },
        pastel: {
          pink: '#FFD6E8',
          yellow: '#FFF4CC',
          green: '#D4F4DD',
          blue: '#D6E9FF',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        drawer: '-4px 0 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        card: '16px',
        input: '8px',
      },
    },
  },
  plugins: [],
};
