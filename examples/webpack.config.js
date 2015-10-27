var path = require('path')
module.exports = {
  entry: ['./js/index.js'],
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'example.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
}
