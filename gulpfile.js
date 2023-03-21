import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import concat from 'gulp-concat';
import htmlMin from 'gulp-htmlmin';
import autoprefixes from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import svgSprite from 'gulp-svg-sprite';
import image from 'gulp-image';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import { onError } from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import { deleteAsync } from 'del';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import count from 'gulp-count';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import inject from 'gulp-inject';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const sass = gulpSass( dartSass );
browserSync.create();

// eslint-disable-next-line no-undef
const argv = yargs(hideBin(process.argv)).argv;
const isBuild = (argv.build !== undefined);
console.log('build-global', isBuild);

/** Очистка директории */
const clean = () => {
  return deleteAsync(['dist']);
};

/** Преобразование SASS в CSS */
const sassStyles = () => {
  return src('src/sass/**/*.scss')
    .pipe(count('## sass-files selected'))
    .pipe(gulpif(!isBuild, sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!isBuild, sourcemaps.init()))
    .pipe(dest('src/styles/'))
    .pipe(browserSync.stream());
};

/** Минификация CSS */
const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(count('## css-files selected'))
    .pipe(gulpif(!isBuild, sourcemaps.init()))
    // .pipe(concat('main.css'))
    .pipe(autoprefixes({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level:2,
    }))
    .pipe(gulpif(!isBuild, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

/** Минификация HTML */
const html = () => {
  return  src('src/**/*.html',  { allowEmpty: true })
    .pipe(count('## html-files selected'))
    .pipe(gulpif(isBuild, htmlMin({
      collapseWhitespace: true,
      html5: true,
      removeComments: false,
      removeTagWhitespace: true,
      preserveLineBreaks: false
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

/** Создание SVG-спрайта */
const svgSprites = () => {
  return src(['src/images/svg/**/*.svg'], { allowEmpty: true })
    .pipe(count('## svg-files selected'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '..sprite.svg'
        },
        symbol: true
      },
    }))
    .pipe(rename('sprites.svg'))
    .pipe(dest('dist/svg'));
};

/** Внедрение SVG-файла в HTML */
const svgInject = () => {
  return gulp.src(
    [
      'dist/index.html',
      'dist/product.html',
      'dist/catalog.html'
    ],
    {
      allowEmpty: true,
    })
    .pipe(inject(gulp.src(['dist/svg/sprites.svg'], { allowEmpty: true }), {
      starttag: '<!-- inject:sprites:{{ext}} -->',
      transform: function (path, file) {
        return file.contents.toString('utf8');
      }
    }))
    .pipe(gulp.dest('dist'));
};

/** Удаление SVG-спрайта из директории */
const svgSpriteDelete = async () => {
  console.log('Delete SVG-sprite folder?', isBuild);
  if(isBuild) {
    const deletedDirectoryPaths = await deleteAsync(['dist/svg']);
    console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'));
  }
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    // open: false,
  });
};

/** Оптимизация изображений */
const images = () => {
  return src ([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
    .pipe(count('## images selected'))
    .pipe(image({
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      pngquant: true,
    }))
    .pipe(dest('dist/images'));
};

/* Конвертирование шрифтов */
const fontsWoff = () => {
  return gulp.src('src/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('src/fonts'))
    .pipe(count('## fonts to *.woff converted'));
};
const fontsWoff2 = () => {
  return gulp.src('src/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('src/fonts'))
    .pipe(count('## fonts to *.woff2 converted'));
};

/** Копирование шрифтов */
const fonts = () => {
  return src([
    'src/fonts/*.woff',
    'src/fonts/*.woff2',
  ], { allowEmpty: true })
    .pipe(gulp.dest('dist/fonts'));
};

/** Импорт JavaScript */
const scripts = () => {
  return src([
    'src/scripts/components/*.js',
    'src/scripts/main.js'
  ], { allowEmpty: true })
    .pipe(count('## js-files selected'))
    .pipe(gulpif(!isBuild, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
  // .pipe(concat('app.js'))
    .pipe(gulpif(isBuild, terser({
      toplevel: true
    }).on('error', onError())))
    .pipe(gulpif(!isBuild, sourcemaps.write()))
    .pipe(dest('dist/scripts'))
    .pipe(browserSync.stream());
};


const _html = series(
  html, // копирование и минификация HTML
  svgInject, // внедрение спрайта в html
  svgSpriteDelete, // удаление спрайта
);
const _styles = series (
  sassStyles, // преобразование SASS в CSS
  styles      // копирование и минификация в dist CSS-файлов
);
const _scripts = scripts;
const _sass = sassStyles;
const _fontsConvert = series(fontsWoff, fontsWoff2);

watch('src/**/*.html', _html);
watch('src/styles/**/*.css', styles);
watch('src/sass/**/*.scss', _styles);
watch('src/images/svg/**/*.svg', series(svgSprites,_html));
watch('src/scripts/**/*.js', scripts);

const _clean = clean;
export { _clean as clean };



export { _html as html };
export { _styles as styles };
export { _scripts as scripts };
export { _sass as sass };
export { _fontsConvert as fonts };

const _default = series(
  clean,      // удаление папки dist
  svgSprites, // создание спрайта
  _html,      // минификация HTML, внедрение спрайта
  scripts,    // копирование и минификация JavaScript
  _styles,    // конвертация SASS в CSS, минификация CSS
  images,     // копирование и минификация изображений
  fonts,      // копирование шрифтов
  watchFiles);
export { _default as default };






