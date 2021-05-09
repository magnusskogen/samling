var browsersync = require("browser-sync").create(),
  errorHandler = require("gulp-error-handle"),
  gulp = require("gulp"),
  mode = require("gulp-mode")({
    modes: ["prod", "dev"],
    default: "dev",
  }),
  pkg = require("./package.json"),
  replace = require("gulp-replace"),
  purgecss = require("gulp-purgecss"),
  postcss = require("gulp-postcss"),
  postcssfor = require("postcss-for"),
  postcssimport = require("postcss-easy-import"),
  postcssNesting = require("postcss-nested"),
  tailwindcss = require("tailwindcss"),
  svgmin = require("gulp-svgmin"),
  watch = require("gulp-watch"),
  webpack = require("webpack"),
  webpackconfig = require("./webpack.config.js"),
  webpackstream = require("webpack-stream"),
  gulpShopify = require("gulp-shopify-upload"),
  rename = require("gulp-rename");

function browserSync() {
  browsersync.init({
    proxy: pkg.paths.siteUrl.dev,
    port: 8080,
    open: true,
    notify: false,
  });
}

function browserSyncReload() {
  browsersync.reload();
}

/* Building files */
function css(done) {
  gulp
    .src(pkg.paths.src.css + "styles.css")
    .pipe(errorHandler())
    .pipe(
      postcss([
        postcssimport(),
        postcssfor(),
        tailwindcss("tailwind.config.js"),
        postcssNesting(),
        require("autoprefixer"),
      ])
    )
    .pipe(
      mode.prod(
        purgecss({
          content: ["**/*.liquid"],
          extractors: [
            {
              extractor: class TailwindExtractor {
                static extract(content) {
                  return content.match(/[A-z0-9-:\/]+/g) || [];
                }
              },
              extensions: ["html", "css", "liquid"],
            },
          ],
        })
      )
    )
    .pipe(gulp.dest(pkg.paths.dest.css));
  browserSyncReload();
  done();
}

function js(done) {
  gulp
    .src([pkg.paths.src.js + "/**/*"])
    .pipe(errorHandler())
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(gulp.dest(pkg.paths.dest.js));
  browserSyncReload();
  done();
}

/* SVG */
function svg(done) {
  gulp
    .src(pkg.paths.src.svg + "*.svg")
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(gulp.dest(pkg.paths.dest.svg));
  done();
}

/* Watch */
function watchFiles(done) {
  gulp.watch(pkg.paths.src.css + "**/*", css);
  // gulp.watch('**/*.liquid', css);
  gulp.watch("lab/**.**", browserSyncReload);
  gulp.watch("tailwind.js", css);
  gulp.watch(pkg.paths.src.svg + "**/*", svg);
  gulp.watch(pkg.paths.src.js + "**/*", js);
  // gulp.watch('./+(assets|layout|config|snippets|templates|locales|sections)/**', shopify);
  return watch(
    "./+(assets|layout|config|sections|snippets|templates|locales)/**"
  ).pipe(
    gulpShopify(
      "a735d4525a09d5dcd7bd8d3bd6fb1a2c",
      "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",
      "samling-store.myshopify.com",
      null
    )
  );

  done();
}

/* Tasks */
gulp.task("css", css);
gulp.task("js", js);
gulp.task("svg", svg);

/* The task. Run gulp watch from CLI */
gulp.task("dev", gulp.parallel(watchFiles, browserSync));
gulp.task("build", gulp.parallel(css));