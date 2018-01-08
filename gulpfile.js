const gulp = require('gulp');
const gulpTypescript = require('gulp-typescript');
const gulpPug = require('gulp-pug');
const gulpSass = require('gulp-sass');

const paths = {
  pug: './src/views/[!_]*.pug',
  scss: './src/styles/[!_]*.scss',
  typescript: './src/scripts/[!_]*.ts',
};

gulp.task('pug', () => gulp.src(paths.pug)
  .pipe(gulpPug())
  .pipe(gulp.dest('dist')));

gulp.task('styles', () => gulp.src(paths.scss)
  .pipe(gulpSass())
  .pipe(gulp.dest('dist')));

gulp.task('scripts', () => gulp.src(paths.typescript)
  .pipe(gulpTypescript())
  .pipe(gulp.dest('dist')));

gulp.task('default', () => {
  gulp.watch('./src/views/**/*', ['pug']);
  gulp.watch('./src/styles/**/*', ['styles']);
  gulp.watch('./src/scripts/**/*', ['scripts']);
});
