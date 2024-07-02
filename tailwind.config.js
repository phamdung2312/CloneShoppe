/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: { orangeHeaderTop: '#f6432e', orangeHeaderBottom: '#fe6332' },
      colorHeader: 'linear-gradient(-180deg, #f53d2d, #f63)',
      scrollbarWidth: {
        thin: '10px'
      },
      scrollbarColor: {
        red100: '#fecaca'
      },
      scrollbarTrackColor: {
        slate50: '#f8fafc'
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
      })
    }),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ]
}
