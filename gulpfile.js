/**
 * Task to building styles
 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const mqpacker = require('css-mqpacker');
const path = require('path');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const replace = require('gulp-string-replace');

const postCSSOptions = [
    autoprefixer(),
    mqpacker(), // Gabung media query jadi satu
    cssnano(), // Minify css
];

const sassOptions = {
    includePaths: [path.resolve(__dirname, './src/')],
};

module.exports = {
    postCSSOptions,
    sassOptions,
};

gulp.task('editor', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/editor.scss')])
        .pipe(sass({ includePaths: ['node_modules', '../node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('editor.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('framework/assets/css/'));
});

gulp.task('frontend', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/frontend.scss')])
        .pipe(sass({ includePaths: ['node_modules', '../node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('frontend.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('framework/assets/css/'));
});

gulp.task('backend', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/backend.scss')])
        .pipe(sass({ includePaths: ['node_modules', '../node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('backend.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('framework/assets/css/'));
});

// @since 3.2.0
gulp.task('notifications', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/notifications.scss')])
        .pipe(sass({ includePaths: ['node_modules', '../node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('notifications.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('framework/assets/css/'));
});

gulp.task('build-process', gulp.parallel('editor', 'frontend', 'backend', 'notifications'));

gulp.task('build', gulp.series('build-process'));

const watchProcess = (basePath = '.') => {
    gulp.watch([`${basePath}/src/**/*.scss`], gulp.parallel(['editor', 'frontend', 'backend', 'notifications']));
};

gulp.task('use-dev-mode-js', function () {
    return gulp
        .src('./framework/assets/js/**/*.js')
        .pipe(replace('--dev_mode--', 'true'))
        .pipe(gulp.dest('./framework/assets/js/'));
});

gulp.task('use-dev-mode-php', function () {
    return gulp
        .src('./framework/**/*.php')
        .pipe(replace('--dev_mode--', 'true'))
        .pipe(gulp.dest('./framework/'));
});

gulp.task('clean', function () {
    return del([
        './build/**',
        './framework/assets/js/**',
        './framework/assets/css/**',
        './framework/languages/**',
        './framework/lib/dependencies/**'
    ], {force:true});
});

gulp.task(
    'watch',
    gulp.series('build-process', function watch(done) {
        watchProcess();
        done();
    })
);

module.exports.watchProcess = watchProcess;
