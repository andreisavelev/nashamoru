var gulp = require("gulp");
var connect = require("gulp-connect");
var opn = require("opn");
var min = require("gulp-uglify");
var less = require("gulp-less");
var concat = require("gulp-concat");
var path = require("path");

// Compile less
gulp.task('less', function () {
	return gulp.src('./frontend/src/css/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(gulp.dest('./frontend/src/css'))
});

gulp.task('bootstrapfont', function () {
	return gulp.src('./frontlibs/bootstrap/fonts/*.*')
		.pipe(gulp.dest('./frontend/src/css/fonts/'))
});

// Concat js
gulp.task('scripts', function() {
	return gulp.src([
		"./frontlibs/jquery/dist/jquery.min.js",
		"./frontlibs/bootstrap/dist/js/bootstrap.min.js",
		"frontlibs/leaflet/dist/leaflet.js",
		"frontlibs/firebase/firebase.js"
	])
		.pipe(concat('common.js'))
		.pipe(gulp.dest('./frontend/src/js/'));
});

gulp.task('connect', function() {
	connect.server({
		root: './frontend/src',
		livereload: true
	});
});

gulp.task('html', function () {
	return gulp.src('./frontend/src/*.html')
		.pipe(connect.reload());
});

gulp.task('js', function () {
	return gulp.src('./frontend/src/js/*.js')
		.pipe(connect.reload());
});

gulp.task('leafletimg', function () {
	return gulp.src('./frontlibs/leaflet/dist/images/*.*')
		.pipe(gulp.dest('./frontend/src/js/images/'))
});

gulp.task('watch', function () {
	gulp.watch(['./frontend/src/*.html', './frontend/src/js/*.js', './frontend/src/css/*.less'], ['js', 'less', 'html']);
});

gulp.task('compcss', function () {
	return gulp.src('./frontend/src/css/style.css')
		.pipe(gulp.dest('./frontend/app/css/'));
});

gulp.task('compjs', function () {
	return gulp.src('./frontend/src/js/*.js')
		.pipe(min())
		.pipe(gulp.dest('./frontend/app/js/'));
});

gulp.task('comphtml', function () {
	return gulp.src('./frontend/src/*.html')
		.pipe(gulp.dest('./frontend/app/'));
});

gulp.task('compile', ['compcss', 'compjs', 'comphtml']);

gulp.task('default', ['scripts', 'leafletimg', 'less', 'bootstrapfont', 'connect', 'watch']);