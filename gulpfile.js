const gulp = require('gulp');
const typescript = require('gulp-typescript');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

const clean = require('gulp-clean');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const minify = require('gulp-minify');
const rename = require('gulp-rename');

const paths = {
  pug: './src/views/[!_]*.pug',
  scss: './src/styles/[!_]*.scss',
  typescript: './src/scripts/[!_]*.ts',
  css: [
    'tmp/css/**/*.css',
  ],
  js: [
    'node_modules/jquery/dist/jquery.slim.js',
    'node_modules/popper.js/dist/umd/popper-utils.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'tmp/js/**/*.js',
  ],
};

gulp.task('views', () => gulp.src(paths.pug)
  .pipe(pug())
  .pipe(gulp.dest('dist')));

gulp.task('clean-tmp', function () {
  return gulp.src('tmp/**/*')
    .pipe(clean());
});

gulp.task('scss', ['clean-tmp'], () => gulp.src(paths.scss)
  .pipe(sass())
  .pipe(gulp.dest('tmp/css')));

gulp.task('styles', ['scss'], () => gulp.src(paths.css)
  .pipe(csso())
  .pipe(rename('bundle.min.css'))
  .pipe(gulp.dest('dist')));

gulp.task('typescript', ['clean-tmp'], () => gulp.src(paths.typescript)
  .pipe(typescript())
  .pipe(gulp.dest('tmp/js')));

gulp.task('scripts', ['typescript'], () => gulp.src(paths.js)
  .pipe(concat('bundle.js'))
  .pipe(minify({
    ext: {
      min: '.min.js',
    },
  }))
  .pipe(gulp.dest('dist')));

gulp.task('dist', ['styles', 'scripts', 'views', 'clean-tmp']);

gulp.task('default', () => {
  gulp.watch('./src/views/**/*', ['views']);
  gulp.watch('./src/styles/**/*', ['styles']);
  gulp.watch('./src/scripts/**/*', ['scripts']);
});