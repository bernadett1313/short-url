/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    // Sobrescribimos o extendemos las pantallas por defecto
    screens: {
      '2xs': '360px', // Custom breakpoint para pantallas muy pequeñas
      'xs': '480px',  // Custom breakpoint para ~pantallas mayores a 480px
      'sm': '640px',  // breakpoint por defecto
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
