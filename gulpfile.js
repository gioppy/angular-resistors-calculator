var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cmq = require('gulp-combine-mq');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');

var sequence = require('run-sequence');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('images', function(){
  return gulp.src('./assets/images/*')
    .pipe(gulp.dest('./dist/assets/images'));
})

gulp.task('favicons', function(){
  return gulp.src('./assets/favicons/*')
    .pipe(gulp.dest('./dist/assets/favicons'));
})

gulp.task('htmlmin', function(){
  return gulp.src('./dist/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('usemin', function(){
  return gulp.src('./index.html')
    .pipe(usemin({
      app: [uglify()]
    }))
    .pipe(gulp.dest('./dist'));
})

gulp.task('sass', function(){
  return gulp.src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/styles'))
});

gulp.task('min:js', ['concat'], function(cb){
  gulp.src(['./dist/app/app.tmp.js'])
    .pipe(uglify())
    .pipe(rename(function(path){
      var name = path.basename;
      path.basename = name.replace('.tmp', '.min');
    }))
    .pipe(gulp.dest('./dist/app'));

    del(['./dist/app.tmp.js'], cb);
});

gulp.task('concat', function(){
  return gulp.src(['./app/*.module.js', './app/*.config.js', './app/**/*.js'])
    .pipe(concat('app.tmp.js'))
    .pipe(gulp.dest('./dist/app'));
})

gulp.task('min:css', ['combine'], function(){
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

gulp.task('clean:dist', function(cb){
  return del([
    './dist/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

gulp.task('build', function(callback){
  sequence(
    'clean:dist',
    'min:css',
    'favicons',
    'images',
    'usemin',
    'htmlmin',
    callback
  );
});
