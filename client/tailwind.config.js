/** @type {import('tailwindcss').Config} */
export default {
  // 1. Habilitar el modo oscuro basado en clases
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta para el Modo Oscuro (existente)
        'brand-dark': '#1a1a1a',
        'brand-gold': '#c3a478',
        
        // Nueva Paleta para el Modo Claro
        'light-bg': '#f8f9fa',      // Fondo claro
        'light-text': '#212529',     // Texto oscuro
        'light-card': '#ffffff',    // Fondo de tarjetas
        'light-accent': '#b59469',  // Acento dorado para modo claro
        'light-subtle': '#e9ecef',   // Un gris sutil para bordes o fondos secundarios
      },
    },
  },
  plugins: [],
}
