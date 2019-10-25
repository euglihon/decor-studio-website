var gulp       = require('gulp'),
  sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin');

  gulp.task('sass-gallery', function() { // Создаем таск Sass
    return gulp.src('app/sass/style-gallery.scss') // Берем источник
      .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
      .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
      .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
      .pipe(cssnano()) // Сжимаем
      .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({stream: true}));// Обновляем CSS на странице при изменении
  });

  gulp.task('sass', function() { // Создаем таск Sass
	return gulp.src('app/sass/style.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src('app/js/**/*.js')
		//.pipe(uglify()) // Сжимаем JS файл
		//.pipe(rename({suffix: ".min"}))
  	//.pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('clean', async function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		//.pipe(cache(imagemin({ // С кешированием
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/*)*/
		.pipe(gulp.dest('dist/img'));
  });

  gulp.task('htmlmin', () => {
    return gulp.src('app/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
  });

gulp.task('prebuild', async function() {

	var buildCss = gulp.src('app/css/**/*')
	.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})


gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.scss', ['sass', 'sass-gallery']); // Наблюдение за sass файлами
	gulp.watch('app/*.html', ['code']); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', ['scripts']); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', ['sass-gallery', 'sass', 'scripts', 'browser-sync', 'watch']);
gulp.task('build', ['prebuild', 'clean', 'img', 'htmlmin', 'sass', 'sass-gallery', 'scripts']);

