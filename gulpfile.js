var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('uglify', function(){
	return gulp.src(['src/**/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/minx'));
});

gulp.task('concat-core', gulp.series('uglify', function () {
	return gulp.src('dist/minx/core/*.js')
		.pipe(concat('zn.core.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-data', gulp.series('uglify', function () {
	return gulp.src('dist/minx/data/*.js')
		.pipe(concat('zn.data.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-util', gulp.series('uglify', function () {
	return gulp.src('dist/minx/util/*.js')
		.pipe(concat('zn.util.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-web', gulp.series('uglify', function () {
	return gulp.src('dist/minx/web/*.js')
		.pipe(concat('zn.web.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

//建立一个默认执行的任务，这个任务顺序执行上面创建的N个任务
gulp.task('default', gulp.series('concat-core', 'concat-data', 'concat-util', 'concat-web'));