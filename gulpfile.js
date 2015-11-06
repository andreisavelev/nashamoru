var gulp = require("gulp");
var connect = require("gulp-connect");
var opn = require("opn");
var min = require("gulp-uglify");
var less = require("gulp-less");
var concat = require("gulp-concat");

// Compile less
gulp.task('less', function () {
	return gulp.src('./frontend/src/css/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(gulp.dest('./frontend/app/css'));
});