/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Añadimos nuestra paleta de colores personalizada
      colors: {
        'brand-dark': '#1a1a1a', // Un gris muy oscuro casi negro
        'brand-gold': '#c3a478', // El color de acento dorado/bronce
      },
    },
  },
  plugins: [],
}