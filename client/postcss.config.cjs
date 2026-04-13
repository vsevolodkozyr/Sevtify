// postcss.config.js
const postcssImport = require('postcss-import');
const postcssPxToRem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    postcssImport(),
    require('@tailwindcss/postcss'),
    postcssPxToRem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    }),
    autoprefixer(),
    ...(isProduction ? [cssnano()] : []),
  ],
};
