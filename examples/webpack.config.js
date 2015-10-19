module.exports = {
  entry: './js/index.js',
  output: {
    filename: './js/example.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
}
