'use strict';

// Load plugins
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './build/'
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// CSS task
function css() {
    return gulp
        .src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css/'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch('./src/scss/**/*', css);
}

function html() {
    gulp.watch('./build/**/*.html', browserSyncReload);
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync, html);

const build = gulp.parallel(css);

// export tasks
exports.watch = watch;
exports.build = build;
