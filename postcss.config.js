
const defaults = {
  minify: true,
  // https://github.com/postcss/autoprefixer
  autoprefixer: {
    // https://github.com/ai/browserslist
    browsers: [
      '> 1%',
      'last 2 versions',
      'safari > 6',
      'ie > 9',
      'ios > 6',
      'android > 4.3',
      'samsung > 3',
      'chromeandroid > 50'
    ]
  },
  // http://cssnano.co/optimisations/
  cssnano: {
    calc: false,
    autoprefixer: false,
    mergeRules: false,
    safe: true
  }
}

module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')({
          config: {
            extends:'stylelint-config-cssplus',
            rules: {
              'at-rule-no-unknown': null
            }
          }
        })
      ]
    }),
    require('postcss-cssplus')(defaults.autoprefixer),
    require('postcss-simple-reset'),
    require('postcss-reporter')({'clearMessages': true}),
    defaults.minify ? require('cssnano')(defaults.cssnano) : false
  ]
});
