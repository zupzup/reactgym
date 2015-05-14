var gulp = require('gulp'),
    webpack = require("webpack"),
    gutil = require("gulp-util"),
    sass = require('gulp-sass'),
    shell = require("gulp-shell"),
    del = require("del"),
    replace = require('gulp-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    jest = require('jest-cli'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    phonegap = require('phonegap'),
    gulpif = require("gulp-if"),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    dev = process.env.NODE_ENV !== 'production',
    webkackProd = require('./webpack.config.production.js'),
    webpackConfig = require("./webpack.config.js");

var startServer = function() {
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: false
    }).listen(3000, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
    });
};

gulp.task('default', ['sass'], function() {
    gulp.watch('styles/scss/*.scss', ['sass']);
    startServer();
});

gulp.task('test', function(callback) {
    gulp.watch('__tests__/**/*.js', ['test']);
    gulp.watch('scripts/**/*.js', ['test']);
    var onComplete = function() {
        callback();
    };
    jest.runCLI({}, __dirname, onComplete);
});

gulp.task('sass', function () {
    gulp.src('./styles/scss/*.scss')
    .pipe(gulpif(dev, sourcemaps.init()))
        .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulpif(dev, sourcemaps.write()))
        .on('error', function (err) {
            gutil.log(err.message);
        })
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
        if (err) {
            throw new gutil.PluginError("webpack:build-prod", err);
        }
        gutil.log("[webpack:build-prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack", function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
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

gulp.task("buildios", ["injectcordova"], function() {
    console.log('building iOS');
    shell.task([
        'cd native && cordova plugin add org.apache.cordova.vibration',
        'cd native && cordova plugin add org.apache.cordova.file',
        'cd native && phonegap build ios'
    ])();
});

gulp.task("buildandroid", ["injectcordova"], function() {
    console.log('building Android');
    shell.task([
        'cd native && cordova plugin add org.apache.cordova.vibration',
        'cd native && cordova plugin add org.apache.cordova.file',
        'cd native && phonegap build android'
    ])();
});

gulp.task("injectcordova", function(cb) {
    console.log('injecting cordova');
    gulp.src('www/index.html')
    .pipe(replace(/<!-- cordova -->/g, '<script type="text/javascript" charset="utf-8" src="cordova.js"></script>'))
    .pipe(gulp.dest('native/www'));
    cb();
});

gulp.task("phonegap", ["cleannative", "prod"], function(cb) {
    console.log('creating native build...');
    phonegap.create({path: 'native', name: 'SimpleGym'}, function() {
        console.log('removing www folder');
        del(['./native/www'], function() {
            console.log('copying www folder');
            gulp.src('www/**').pipe(gulp.dest('native/www/'));
            console.log('copying config.xml');
            gulp.src('config.xml').pipe(gulp.dest('native/'));
            cb();
        });
    });
});

