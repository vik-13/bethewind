var config = require('./gulp.config')();

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del');

gulp.task('clean', clean);
gulp.task('compile', compile);
gulp.task('build', ['clean'], compile);

gulp.task('default', ['build']);

function clean() {
    return del(config.release.index);
}

function compile() {
    return buildIndex();
}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildScripts(), { relative: true }))
        .pipe(inject(buildStyles(), { relative: true }))
        .pipe(gulp.dest(config.release.index));
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.release.scripts));
}

function buildStyles() {
    return gulp.src(config.sources.stylesheets)
        //.pipe(concat('app.css'))
        .pipe(gulp.dest(config.release.stylesheets));
}