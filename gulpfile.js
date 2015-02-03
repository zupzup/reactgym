var gulp = require('gulp'),
    webpack = require("webpack"),
    sass = require('gulp-ruby-sass'),
    gutil = require("gulp-util"),
    request = require('request'),
    path = require('path'),
    jest = require('jest-cli'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    webpackConfig = require("./webpack.config.js");

gulp.task('default', function() {
    gulp.watch('styles/scss/*.scss', ['sass']);
    startServer();
});

gulp.task('test', function(callback) {
    gulp.watch('__tests__/**/*.js', ['test']);
    gulp.watch('scripts/**/*.js', ['test']);
    var onComplete = function(result) {
        callback();
    };
    jest.runCLI({}, __dirname, onComplete);
});

gulp.task('sass', function () {
    gulp.src('./styles/scss/*.scss')
        .pipe(sass({sourcemap: false, style: 'compact'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('styles'));
});

var webpackDevConfig = Object.create(webpackConfig);
webpackDevConfig.devtool = "sourcemap";
webpackDevConfig.debug = true;
var devCompiler = webpack(webpackDevConfig);

gulp.task("webpack", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

var startServer = function() {
    var server = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    });

    server.listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
    });

    server.app.use(function pushStateHook(req, res, next) {
        var ext = path.extname(req.url);
        if ((ext === '' || ext === '.html') && req.url !== '/') {
            req.pipe(request('http://localhost:3000')).pipe(res);
        } else {
            next();
        }
    });
};
