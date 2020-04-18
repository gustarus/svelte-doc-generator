const rootSelector = '.bootstrap';
// const classPrefix = 'bootstrap';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const insert = require('gulp-insert');
const replace = require('gulp-replace');
const autoprefixer = require('autoprefixer');
const postcssNamespace = require('postcss-namespace');
const selectorNamespace = require('postcss-selector-namespace')({ namespace: rootSelector });

gulp.task('compile-bootstrap', function () {
  const processors = [
    autoprefixer,
    postcssNamespace,
    selectorNamespace
  ];

  return gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(insert.prepend('@prefix ' + classPrefix + ';\n\n'))
    .pipe(insert.append('\n@prefix ;\n'))
    .pipe(postcss(processors))
    .pipe(replace(`${rootSelector} html`, rootSelector))
    .pipe(replace(`${rootSelector} body`, rootSelector))
    .pipe(gulp.dest('./build/vendors/bootstrap'));
});
