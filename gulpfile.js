var gulp = require('gulp'),
    webpack = require("webpack"),
    sass = require('gulp-ruby-sass'),
    gutil = require("gulp-util"),
    shell = require("gulp-shell"),
    del = require("del"),
    request = require('request'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    jest = require('jest-cli'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    phonegap = require('phonegap'),
    webkackProd = require('./webpack.config.production.js'),
    webpackConfig = require("./webpack.config.js");

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

gulp.task('default', ['sass'], function() {
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
        .pipe(autoprefixer("Android >= 4.4", "iOS >= 6"))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('styles'));
});

var webpackDevConfig = Object.create(webpackConfig);
webpackDevConfig.devtool = "sourcemap";
webpackDevConfig.debug = true;
var devCompiler = webpack(webpackDevConfig);
var prodCompiler = webpack(webkackProd);

gulp.task("prod", ["clean"], function(callback) {
    console.log('building prod...');
    gulp.src('index.html').pipe(gulp.dest('www'));
    gulp.src('styles/**').pipe(gulp.dest('www/styles/'));
    prodCompiler.run(function(err, stats) {
        if(err) {throw new gutil.PluginError("webpack:build-prod", err);}
        gutil.log("[webpack:build-prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) {throw new gutil.PluginError("webpack:build-dev", err);}
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("clean", function(cb) {
    console.log('cleaning www...');
    del(['./www'], cb);
});

gulp.task("cleannative", function(cb) {
    console.log('cleaning native...');
    del(['./native'], cb);
});

gulp.task("buildios", function(cb) {
    console.log('building iOS');
    shell.task([
        'cd native && phonegap build ios'
    ])();
});

gulp.task("buildandroid", function(cb) {
    console.log('building Android');
    shell.task([
        'cd native && phonegap build android'
    ])();
});

gulp.task("phonegap", ["cleannative", "prod"], function(cb) {
    console.log('creating native build...');
    phonegap.create({path: 'native', name: 'SimpleGym'}, function() {
        console.log('removing www folder');
        del(['./native/www'], function() {
            console.log('copying www folder');
            gulp.src('www/**').pipe(gulp.dest('native/www/'));
            cb();
        });
    });
});

