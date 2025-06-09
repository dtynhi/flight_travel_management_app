import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        primary: '#4b49ac',
        trinidad: {
          50: '#fff3ed',
          100: '#ffe3d5',
          200: '#fec7aa',
          300: '#fda374',
          400: '#fb7d3c',
          500: '#f96416',
          600: '#ea580c',
          700: '#c24a0c',
          800: '#9a4112',
          900: '#7c3612',
          950: '#431c07'
        },
        error: '#ff4d4f'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      });
    })
  ]
};
