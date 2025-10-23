/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sompo: {
          // Primary Colors (from brand guide)
          red: '#DF082A',
          white: '#FFFFFF',
          'light-platinum': '#EFF4F5',
          'light-red': '#FFF1F1',
          black: '#000000',

          // Secondary Colors
          'dark-red': '#9B2222',
          'medium-red': '#EEAAAA',
          'medium-platinum': '#C8CED2',
          'dark-platinum': '#94989C',

          // Tertiary Colors (for data visualization)
          'dark-purple': '#874CA9',
          'medium-purple': '#A780D1',
          'light-purple': '#D2BDFF',
          'dark-orange': '#AE6A19',
          'medium-orange': '#FC9F31',
          'light-orange': '#FFC47E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
} 