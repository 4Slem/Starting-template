'use strict';

let gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	watch = require('gulp-watch'),
	server = require('gulp-server-livereload'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	notify = require('gulp-notify');

gulp.task('styles', () => {
	return gulp.src(['node_modules/normalize.css/normalize.css', 'src/styles/main.scss'])
		.pipe(sass())
		.pipe(concatCss('main.css'))
		.pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify('styles Done!'));
});

gulp.task('jade', () => {
	return gulp.src(['src/jade/**/*.jade', '!src/jade/_**/', '!src/jade/**/_*.jade'])
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('dist'))
		.pipe(notify('jade Done!'));
});

gulp.task('js', () => {
	return gulp.src(['src/js/main.js'])
		.pipe(gulp.dest('dist/js'))
		.pipe(notify('js Done!'));
});

gulp.task('images', () => {
	return gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(notify('images Done!'));
});

gulp.task('fonts', () => {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'))
		.pipe(notify('fonts Done!'));
});

gulp.task('webserver', () => {
  	return gulp.src('./')
    .pipe(server({
     	livereload: true,
      	directoryListing: true
    }));
});

gulp.task('watch', function() {
	gulp.watch(['src/jade/**/*.jade'], ['jade']);
	gulp.watch(['src/styles/**/*.scss'], ['styles']);
	gulp.watch(['src/js/**/*.js'], ['js']);
	gulp.watch(['src/images/**/*.*'], ['images']);
	gulp.watch(['src/fonts/**/*.*'], ['fonts']);
});

gulp.task('default', ['jade', 'styles', 'js', 'images', 'fonts', 'watch'/*, 'webserver'*/]);