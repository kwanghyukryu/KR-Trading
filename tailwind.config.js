/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff4f8',
          100: '#d9e4ee',
          400: '#2d5f87',
          500: '#1f4d71',
          600: '#163a55',
          900: '#0f2233'
        },
        sand: '#f3f5f7',
        saffron: '#be9557',
        pine: '#1f5b4a'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 34, 51, 0.12)'
      },
      fontFamily: {
        display: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
