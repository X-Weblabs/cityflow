/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#305ea5',
          container: '#84aefa',
        },
        secondary: {
          DEFAULT: '#006b60',
          dim: '#005e54',
          container: '#8ff4e3',
        },
        tertiary: {
          DEFAULT: '#b5281f',
          container: '#fe5c4c',
        },
        surface: {
          DEFAULT: '#faf8ff',
          container: '#ebedfc',
          'container-low': '#f2f3ff',
          'container-lowest': '#ffffff',
          'container-high': '#e4e7f8',
          'container-highest': '#dee2f5',
          variant: '#dee2f5',
        },
        on: {
          surface: '#2d3240',
          'surface-variant': '#5a5f6e',
          primary: '#f8f8ff',
          'primary-container': '#002d62',
          secondary: '#e2fff8',
          'secondary-container': '#005c53',
          tertiary: '#fff7f6',
          'tertiary-container': '#310001',
        },
        outline: {
          DEFAULT: '#757a8b',
          variant: '#adb1c3',
        }
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0px 8px 24px rgba(45, 50, 64, 0.06)',
      }
    },
  },
  plugins: [],
}
