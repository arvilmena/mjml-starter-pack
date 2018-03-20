import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import rename from 'gulp-rename'
import gutil from 'gulp-util'
import path from 'path'
import { exec } from 'child_process'
import mjml from 'gulp-mjml'
import mjmlEngine from 'mjml'

var browserSync = require('browser-sync').create();


const src = "./src/index.mjml"
const dest = "./src/output/"

const customComponents = 'components/**.js'

/**
 * Tasks
 */

gulp.task('compileComponents', () => {
  return gulp.src(path.normalize(customComponents))
    .pipe(babel())
    .on('error', gutil.log)
    .pipe(gulp.dest('lib'))
    .on('end', () => {
        console.log('> MJML component compilation finished')
    })
});

gulp.task('compileMjml', () => {
  return gulp.src(src)
    .pipe(mjml(mjmlEngine, {minify: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('end', () => {
        console.log('> index.mjml transpiling finished')
    })
});


gulp.task('build', ['compileComponents' ,'compileMjml'])

gulp.task('watch', () => {
  compileComponents()
  compileMjml()
  return watch([
    path.normalize(customComponents),
    path.normalize(src),
  ], [compileComponents,compileMjml])
})

// Static Server + watching scss/html files
gulp.task('serve', ['compileComponents', 'compileMjml'], function() {

    browserSync.init({
        server: dest
    });

    gulp.watch(customComponents, ['compileComponents', 'compileMjml']);
    gulp.watch(src, ['compileMjml']);
    gulp.watch(dest+"*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);