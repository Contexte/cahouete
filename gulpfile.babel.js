import path from "path"
import browser from "browser-sync"
import del from "del"
import fs from "fs"

import gulp from "gulp"
import mjml from "gulp-mjml"
import nunjucks from "gulp-nunjucks-render"
import rename from "gulp-rename"
import htmlmin from "gulp-htmlmin"

const PATHS = {
  srcFilesGlob: path.resolve(__dirname, "src/**/*"),
  pagesGlob: path.resolve(__dirname, "src/pages/**/*.njk"),

  rootDir: path.resolve(__dirname, "src"),
  componentsDir: path.resolve(__dirname, "src/components"),
  fontsDir: path.resolve(__dirname, "src/fonts"),
  layoutsDir: path.resolve(__dirname, "src/layouts"),
  pagesDir: path.resolve(__dirname, "src/pages"),
  stylesDir: path.resolve(__dirname, "src/styles"),

  buildDir: path.resolve(__dirname, "__build__"),
  outputDir: path.resolve(__dirname, "dist"),
}

/**
 * Definitions of tasks
 */
const clean = (done) => {
  del([PATHS.outputDir, PATHS.buildDir]).then(() => { done() })
}

const templates = () => {
  return gulp.src(PATHS.pagesGlob)
    .pipe(nunjucks({
      data: PATHS,
      path: [
        PATHS.componentsDir,
        PATHS.fontsDir,
        PATHS.layoutsDir,
        PATHS.pagesDir,
        PATHS.stylesDir,
      ],
      envOptions: {
        noCache: true
      }
    }))
    .pipe(gulp.dest(PATHS.buildDir))
    .pipe(mjml())
    .pipe(rename((path) => {
      path.basename = path.dirname.toLowerCase()
      path.dirname = ""
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(PATHS.outputDir))
}

const server = (done) => {
  browser.init({
    server: PATHS.outputDir,
    port: '8000',
    directory: true,
  })

  done()
}

const watch = () => {
  gulp.watch(PATHS.srcFilesGlob).on('all', gulp.series(templates, browser.reload))
}

/**
 * Tasks
 */
gulp.task('build', gulp.series(clean, templates))
gulp.task('watch', gulp.series('build', server, watch))



