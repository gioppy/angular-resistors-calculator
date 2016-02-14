var gulp = require('gulp');
var sass = require('gulp-sass');
var cmq = require('gulp-combine-mq');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//run the app packed in the dist folder
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function(){
  return gulp.src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/styles'))
});

gulp.task('min', ['combine'], function(){
  return gulp.src('assets/styles/*.tmp.css')
    .pipe(cssmin({
      showLog:false
    }))
    .pipe(rename(function(path){
      var name = path.basename;
      path.basename = name.replace('.tmp', '.min');
    }))
    .pipe(gulp.dest('assets/styles'));
});

gulp.task('combine', ['sass'], function() {
  return gulp.src(['assets/styles/*.css', '!assets/styles/*.tmp.css', '!assets/styles/*.min.css'])
    .pipe(cmq({
      beautify: false
    }))
    .pipe(rename({suffix: '.tmp'}))
    .pipe(gulp.dest('assets/styles'));
});

gulp.task('watch', function(){
  gulp.watch(['assets/scss/*.scss'], ['sass']);
  gulp.watch(['assets/styles/*.css', '!assets/styles/*.tmp.css', '!assets/styles/*.min.css'], ['min']);
});
