// npm i gulp-serve gulp-livereload webpack gulp-util gulp connect-livereload -D
var serve = require('gulp-serve')
var livereload = require('gulp-livereload')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var gutil = require('gulp-util')
var gulp = require('gulp')
var webpackConfig = require('./webpack.config.js')
var inject = require('connect-livereload')()
var path = require('path')
var myConfig = Object.create(webpackConfig)
// for debugging
myConfig.devtool = 'sourcemap'
myConfig.debug = true

var paths = {
  scripts: ['index.js'],
  // file list for watching
  asserts: ['css/*', 'index.html']
}

gulp.task('default', ['build-dev', 'webpack:dev-server'])

gulp.task('build-dev', ['serve'], function () {
  livereload.listen({
    start: true
  })
  // build js files on change
  // gulp.watch(paths.scripts, ['webpack:build-dev'])
  var watcher = gulp.watch(paths.asserts)
  watcher.on('change', function (e) {
    livereload.changed(e.path)
  })
})

// static server
gulp.task('serve', serve({
  root: [__dirname],
  // inject livereload script ot html
  middleware: inject
}))

var devCompiler = webpack(myConfig)
var outputFile = path.resolve(myConfig.output.path, myConfig.output.filename)

gulp.task('webpack:build-dev', function (callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.pluginError('webpack:build-dev', err) // eslint-disable-line
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }))
    livereload.changed(outputFile)
    callback()
  })
})

gulp.task('webpack:dev-server', function () {
  var devServerConfig = Object.create(myConfig)
  // webpack need this to send request to webpack-dev-server
  devServerConfig.output.publicPath = '/js/'
  devServerConfig.plugins = devServerConfig.plugins || []
  devServerConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // inline mode
  devServerConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server')
  var compiler = webpack(devServerConfig)
  new WebpackDevServer(compiler, {
    // contentBase: {target: 'http://localhost:3000/'},
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,
    proxy: {
      '*': 'http://localhost:3000'
    },
    publicPath: '/js/',
    lazy: false,
    hot: true
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
  })
})

