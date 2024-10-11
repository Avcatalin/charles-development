module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./**/*.html'],
  theme: {
    colors: {
      white: '#fff',
      primary: '#221F20',
      secondary: '#FFF171',
      grey: '#F4F4F4',
      muted: '#B2B2B1'
    },
    screens: {
      'mobile': { 'max': '767px' },
      'tablet': { 'min': '768px', 'max': '1139px' },
      // => @media (min-width: 768px) and (max-width: 1139px) { ...
      'desktop': '1140px',
      // => @media (min-width: 1140px) { ... }
    },
    extend: {
      lineHeight: {
        'header': '1.1',
      },
      maxWidth: {
        '16': '4rem'
      },
      fontSize: {
        'xs': '.875rem'
      }
    },
  },
  variants: {},
  plugins: [],
}
