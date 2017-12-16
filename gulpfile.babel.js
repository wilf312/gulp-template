import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import frontMatter from 'gulp-front-matter';
import wrapper from 'layout-wrapper';
var del = require('del');

const path = {
  ejs: {
    layoutDir: `${__dirname}/src/ejs/layouts`,
    src: [
      './src/ejs/**/*.ejs',
      '!./src/ejs/**/_*.ejs'
    ],
    dist: './htdocs/'
  },
  json: {
    package: './package.json',
    newsList: './src/data/newsList.json'
  }
};

global.jsonData = {};
jsonData.newsListJson = require(path.json.newsList);

gulp.task('ejs', () => {
  var extName = require(path.json.package);

  gulp.src(path.ejs.src)
    .pipe(plumber())
    .pipe(frontMatter({
      property: 'data'
    }))
    .pipe(ejs())
    .pipe(wrapper({
      layout: path.ejs.layoutDir,
      data: {
        name: 'ホゲのサイト',
        layoutsDir: path.ejs.layoutDir
      },
      engine: 'ejs',
      frontMatterProp: 'data'
    }))
    .pipe(ejs({}, {}, {'ext': '.html'}))
    .pipe(gulp.dest(path.ejs.dist));
});

gulp.task('clean', function () {
  return del([
    'htdocs/**/*.ejs',
    '!dist/mobile/deploy.json'
  ]);
});



gulp.task('default', ['ejs', 'clean']);