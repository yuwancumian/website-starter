var gulp = require('gulp');

var connect = require('gulp-connect');
var watch = require('gulp-watch');
var less = require('gulp-less');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

//var coffee = require('gulp-coffee');
//var livereload = require('gulp-livereload');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
		root: 'html'
		//host: 'ajia.dev'
  });
});
 
/*
gulp.task('livereload', function() {
  gulp.src(['html/*.html', 'html/css/*.css'])
		.pipe(watch(['html/*.html','html/css/*.css','html/js/*.js']))
    .pipe(connect.reload());
});
*/

gulp.task('html',function(){
  	gulp.src('app/*.html')
    .pipe(gulp.dest('html/'))
});

gulp.task('less',function(){
  	gulp.src('app/less/main.less')
  	.pipe(less())
	// .pipe(concat('all.css'))
	.pipe(gulp.dest('html/css/'))
	.pipe(minifyCss())
	.pipe(rename('main.min.css'))
	.pipe(gulp.dest('html/css'))
});

gulp.task('js',function(){
	gulp.src('app/js/*.js')
	.pipe(gulp.dest('html/js'))
});

gulp.task('img',function(){
	gulp.src('app/images/*.*')
	.pipe(gulp.dest('html/images'))
});
 

gulp.task('watch', function() {
	gulp.watch('app/*.jade', ['jade']);
	gulp.watch('app/less/*.less', ['less']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/images/', ['img']);
})


gulp.task('style',['less','css']);
gulp.task('jd',['jade']);
gulp.task('default', ['jade', 'less', 'js', 'img', 'webserver', 'watch']);
