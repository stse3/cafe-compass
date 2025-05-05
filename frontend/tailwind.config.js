/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // ⬅️ important: set correct paths!
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        pixel: ['Pixelify Sans', 'sans']
        
      },a
      colors: {
        gold: '#F0B35C',
        cream: '#FFF1ED',
        copper: '#C87741',
        brown: '#5A3E2B',
        charcoal: '#2E2E2E',
        lightGreen: '#DDEFC8',
        darkPink: '#D85A7F',
        vanilla: '#FFFDFA',
        darkGreen: '#4F6F28'
      },
      textShadow: {
        'default': '0 4px 4px rgba(0,0,0,0.25)',
        'md': '0 4px 8px rgba(0,0,0,0.25)',
        'lg': '0 8px 16px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
