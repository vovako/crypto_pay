import gulp from 'gulp'
import bs from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
const sass = gulpSass(dartSass)

const distFolder = 'public'
const path = {
	src: {
		scss: 'scss/style.scss'
	},
	build: {
		css: `${distFolder}/css`
	},
	watch: {
		html: `${distFolder}/**/*.html`,
		scss: 'scss/**/*.scss',
		js: `${distFolder}/**/*.js`
	}
}

function html() {
	return gulp.src(path.watch.html)
		.pipe(bs.stream())
}
function scss() {
	return gulp.src(path.src.scss)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.build.css))
		.pipe(bs.stream())
}
function js() {
	return gulp.src(path.watch.js)
		.pipe(bs.stream())
}
function server() {
	bs.init({
		server: distFolder,
		notify: false
	})
}
function watch() {
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
}

gulp.task('default', gulp.series(scss, gulp.parallel(server, watch)))