'use strict';

const gulp      = require('gulp');
const lint      = require('gulp-eslint');
const mocha     = require('gulp-mocha');
const webpack   = require('gulp-webpack');
const del       = require('del');


let paths = ['*.js', 'models/*.js', 'routes/*.js', 'test/*.js', 'public/js/*.js'];

gulp.task('eslint', () => {
  gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('test', () => {
  gulp.src(__dirname + '/test/*.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('del-build', () => {
  return del([
    __dirname + '/public/build/**', __dirname + '!/public/build'
  ])
  .then(paths => console.log('Deleted files and folders:\n', paths.join('\n')));
});

gulp.task('copy-html', () => {
  gulp.src(__dirname + '/public/index.html')
  .pipe(gulp.dest(__dirname + '/public/build'));
});

gulp.task('copy-css', () => {
  gulp.src(__dirname + '/public/css/*.css')
  .pipe(gulp.dest(__dirname + '/public/build'));
});

gulp.task('webpack', () => {
  return gulp.src(__dirname + '/public/js/app.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css'}
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/public/build'));
});

gulp.task('bundle:test', () => {
  return gulp.src('./public/test/client_spec.js')
  .pipe(webpack({output: {filename: 'test_bundle.js'},
  watch: true,
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css'}
    ]
  }
}))
  .pipe(gulp.dest(__dirname + '/public/test'));
})

gulp.task('watch', () => {
  gulp.watch(paths);
});

gulp.task('default', ['eslint', 'del-build', 'webpack', 'copy-html', 'copy-css', 'bundle:test']);
