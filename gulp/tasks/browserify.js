var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
// var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var config = require('../config').browserify;

const opts = {
  cache: {},
  packageCache: {},
  debug: config.debug,
  extensions:['.jsx']
};
var b = browserify(config.src, opts);
config.settings.transform.forEach(function(t) {
  b.transform(t, { 'optional': 'es7.objectRestSpread' });
});
var w = watchify(b);

gulp.task('browserify', bundle);
w.on('update', bundle);

function bundle(){
  return w.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(gulp.dest(config.dest))
  // .pipe(connect.reload());
  .pipe(livereload());
}
