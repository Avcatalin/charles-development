console.log('PostCSS config loaded');

module.exports = {
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
