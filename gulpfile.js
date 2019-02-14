const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCss = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const pump = require('pump')
const rollup = require('rollup')
const rollupUglify = require('rollup-plugin-uglify-es')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const srcPath = 'src'
const src = {
  scss: `${srcPath}/scss/style.scss`,
  html: `${srcPath}/**/*.html`,
  js: `${srcPath}/js/**/*.js`,
  img: `${srcPath}/img/*`,
  assets: `${srcPath}/assets/**/*`
}

// Dest set to docs for github pages, feel free to change
const destPath = 'dest'
const dest = {
  css: `${destPath}/css`,
  html: destPath,
  js: `${destPath}/js`,
  img: `${destPath}/img`,
  assets: `${destPath}/assets`
}
gulp.task('sass', () => {
  pump([
    gulp.src(src.scss),
    plumber(err => console.error(err)),
    sass({ style: 'compressed' }).on('error', sass.logError),
    autoprefixer({ browsers: ['last 2 versions'] }),
    minifyCss(),
    gulp.dest(dest.css),
    browserSync.stream({ match: '**/*.css' })
  ])
})

gulp.task('html', () => {
  pump([
    gulp.src(src.html),
    plumber(err => console.error(err)),
    // htmlmin({ collapseWhitespace: true, removeComments: true }),
    gulp.dest(dest.html)
  ])
})

gulp.task('js', () => {
  return rollup
    .rollup({
      input: `${srcPath}/js/app.js`,
      plugins: [
        nodeResolve({
          browser: true
        }),
        commonjs()
        // rollupUglify()
      ]
    })
    .then(bundle => {
      return bundle.write({
        file: `${destPath}/js/library.js`,
        format: 'iife',
        name: 'library',
        sourcemap: true
      })
    })
})

gulp.task('image', () => {
  pump([gulp.src(src.img), plumber(err => console.error(err)), imagemin({ verbose: true }), gulp.dest(dest.img)])
})

gulp.task('move-assets', function () {
  return gulp.src([
    src.assets
  ]).pipe(gulp.dest(dest.assets));
});

gulp.task('browserSync', ['sass', 'html', 'js', 'move-assets'], () => {
  browserSync.init({
    injectChanges: true,
    server: `./${destPath}`
  })

  gulp.watch(src.assets, ['move-assets'])
  gulp.watch(src.scss, ['sass'])
  gulp.watch(src.js, ['js'])
  gulp.watch(src.html, ['html'])
  gulp.watch(src.html).on('change', browserSync.reload)
  gulp.watch(src.js).on('change', browserSync.reload)
})

gulp.task('default', ['browserSync'])
