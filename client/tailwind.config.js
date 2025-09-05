/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal - Marrón oscuro de GENERA
        primary: {
          50: '#f8f5f2',
          100: '#e8e0d9',
          200: '#d1c7bb',
          300: '#b8a897',
          400: '#9e8a73',
          500: '#7b612c',
          600: '#6b5326',
          700: '#5a4520',
          800: '#4a371a',
          900: '#3b1f0f',
        },
        
        // Paleta dorada optimizada para ambos modos
        accent: {
          50: '#fef9e7',
          100: '#fdefc6',
          200: '#fbe5a5',
          300: '#f9db84',
          400: '#f7d163',
          500: '#eac568',    // Perfecto para modo oscuro
          600: '#e8b41d',    // Dorado vibrante para modo claro
          700: '#d19e1a',
          800: '#ba8817',
          900: '#a37214',
        },
        
        // Escala de neutros optimizada
        neutral: {
          50: '#faf9f8',     // Fondo claro
          100: '#f3f2f0',
          200: '#e8e6e2',
          300: '#d8d6d1',
          400: '#c4c1ba',
          500: '#a9a59d',
          600: '#847c6f',
          700: '#6d655d',
          800: '#504a44',    // Texto oscuro
          900: '#000000',    // Fondo oscuro verdadero
        },
        
        // MANTENER COMPATIBILIDAD pero optimizado
        'brand-dark': '#000000',
        'brand-gold': '#e8b41d',      // Modo claro
        'light-bg': '#faf9f8',
        'light-text': '#3b1f0f',
        'light-card': '#ffffff',
        'light-accent': '#e8b41d',    // Ahora igual a brand-gold
        'light-subtle': '#f3f2f0',
      },
    },
  },
  plugins: [],
}