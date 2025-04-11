/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // ⬅️ important: set correct paths!
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: '#F0B35C',
        cream: '#FFF1ED',
        copper: '#C87741',
        brown: '#5A3E2B',
        charcoal: '#2E2E2E',
        lightGreen: '#8FD694',
        darkPink: '#D85A7F',
      },
    },
  },
  plugins: [],
};
