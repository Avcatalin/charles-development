const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

// Compile SCSS to CSS
function compileSass() {
  return gulp.src('modules/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('modules'));
}

// Minify CSS using cssnano
function minifyCss() {
  return gulp.src('modules/**/*.css')
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('modules'));
}

// Watch SCSS files for changes
function watchFiles() {
  gulp.watch('modules/**/*.scss', gulp.series(compileSass, minifyCss));
}

// Default task: compile and minify SCSS files
exports.default = gulp.series(compileSass, minifyCss);

// Export watch task for development
exports.watch = watchFiles;
