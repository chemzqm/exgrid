module.exports = {
  entry: './example/js/index.js',
  output: {
    path: 'example/js',
    filename: 'example.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.json$/, loader: 'json' },
      {test: /\.html$/, loader: 'html'}
    ]
  },
  plugins: []
}
