let buildNumber = process.env.CONTINUUM_BUILDNUMBER ? process.env.CONTINUUM_BUILDNUMBER : `local-${new Date().getTime()}`

const gulp          = require('gulp'),
  concat        = require('gulp-concat'),
  plumber       = require('gulp-plumber'),
  server        = require('tiny-lr')(),
  refresh       = require('gulp-livereload'),
  stylus        = require('gulp-stylus'),
  sass          = require('gulp-sass'),
  notify        = require('gulp-notify'),
  nodemon       = require('gulp-nodemon'),
  jshint        = require('gulp-jshint'),
  livereload    = require('gulp-livereload'),
  jasmine       = require('gulp-jasmine'),
  istanbul      = require('gulp-istanbul'),
  reporters     = require('jasmine-reporters'),
  del           = require('del'),
  runSequence   = require('run-sequence'),
  minify        = require('gulp-minifier'),
  inline        = require('gulp-inline'),
  newer         = require('gulp-newer'),
  gnf           = require('gulp-npm-files'),
  inlineFonts   = require('gulp-inline-fonts'),
  sassLint      = require('gulp-sass-lint'),
  autoprefixer  = require('gulp-autoprefixer'),
  writeJsonFile = require('write-json-file'),
  eslint        = require('gulp-eslint'),
  lrPort        = 35729;


const paths = {
  tests: [
    './tests-unit/**/*.js'
  ],
  reports: {
    tests: 'reports/unit-tests',
    functionTests: 'reports/function-tests',
    coverage: 'reports/code-coverage'
  }
}


gulp.task('serve', () => {
  nodemon({'script': 'server/app.js', 'ext':'js html', exec: 'node --inspect'})
})

gulp.task('pre-test', () =>
  gulp.src(['server/**/*.js', 'server/**/*.js.html'])
  // Covering files
    .pipe(istanbul())
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('build/test-tmp/server'))
)

gulp.task('pre-test-config', () =>
  gulp.src(['server/**/*.json'])
  // Write the covered files to a temporary directory
    .pipe(gulp.dest('build/test-tmp/server'))
)


gulp.task('test', ['pre-test', 'pre-test-config'], () => {

    gulp.src(paths.tests)
      .pipe(jasmine({
        reporter: new reporters.JUnitXmlReporter({
          savePath: paths.reports.tests,
          consolidateAll: false,
          filePrefix: 'results-'
        }),
        verbose: true,
        includeStackTrace: true,
        errorOnFail: true
      }))
      .pipe(istanbul.writeReports({
        dir: paths.reports.coverage,
        reporters: ['clover', 'lcov']
      }))
  }
)

gulp.task('functionTest', () =>
  gulp.src(paths.functionTests)
    .pipe(jasmine({
      reporter: new reporters.JUnitXmlReporter({
        savePath: paths.reports.functionTests,
        consolidateAll: false,
        filePrefix: 'results-'
      })
    }))
)




gulp.task('run', (callback) => {
  runSequence(['serve'], callback)
})


