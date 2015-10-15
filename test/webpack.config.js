module.exports = {
  entry: {
    test: ['mocha!./test_index.js']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        { test: /\.html$/, loader: 'html' },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.json$/, loader: 'json' }
    ]
  }
}
