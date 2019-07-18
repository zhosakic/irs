'use strict';

var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    browserSync = require('browser-sync').create();

    sass.compiler = require('node-sass');

gulp.task('serve', function() {                     // запускаем сервер
    browserSync.init({
        server: {
            baseDir: "build/"                       // рабочая папка для сервера build
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('dev/sass/*.sass')              // берём любой файл из папки sass для обработки в css
        .pipe(sass().on('error', sass.logError))    // если есть ошибка в sass файле записываем и выводим её в лог
        .pipe(autoprefixer({
            browsers: ['last 7 versions'],
            cascade: false
        }))                                         // добавляем префиксы для кросбраузерности
        .pipe(csso())                               // минимизируем файл css
        .pipe(gulp.dest('build/css'))              // перемещаем файл в папку builb/css
        .pipe(browserSync.reload({                  // обновляем браузер на том же месте
            stream:true
        }));
});

// gulp.task('autoprefixer', () => {
//     const autoprefixer = require('autoprefixer')
//     const sourcemaps = require('gulp-sourcemaps')
//     const postcss = require('gulp-postcss')
//
//     return gulp.src('./src/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(postcss([ autoprefixer() ]))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./dest'))
// })



gulp.task('html', function () {
   return gulp.src('dev/*.html')                          // перемещаем все файлы html в build
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({                  // обновляем браузер на том же месте
            stream:true
        }));
});

gulp.task('img', function () {
    return del(['build/img/**/*.*']),
    gulp.src('dev/img/**/*.*')                          // перемещаем все файлы img в build
        .pipe(gulp.dest('build/img/'))
        .pipe(browserSync.reload({                  // обновляем браузер на том же месте
            stream:true
        }));
});

gulp.task('js', function () {
    return del(['build/js/**/*.*']),
        gulp.src('dev/js/**/*.*')                          // перемещаем все файлы js в build
            .pipe(gulp.dest('build/js/'))
            .pipe(browserSync.reload({                      // обновляем браузер на том же месте
                stream:true
            }));
});

gulp.task('libs', function () {
    return del(['build/libs/**/*.*']),
        gulp.src('dev/libs/**/*.*')                          // перемещаем все файлы libs в build
            .pipe(gulp.dest('build/libs/'))
            .pipe(browserSync.reload({                      // обновляем браузер на том же месте
                stream:true
            }));
});

gulp.task('fonts', function () {
    return del(['build/fonts/**/*.*']),
        gulp.src('dev/fonts/**/*.*')                          // перемещаем все файлы fonts в build
            .pipe(gulp.dest('build/fonts/'))
            .pipe(browserSync.reload({                      // обновляем браузер на том же месте
                stream:true
            }));
});

gulp.task('css', function () {
    return gulp.src('dev/css/**/*.*')                        // перемещаем все файлы css в build
            .pipe(gulp.dest('build/css/'))
            .pipe(browserSync.reload({                      // обновляем браузер на том же месте
                stream:true
            }));
});

gulp.task('watch-sass', function () {
    gulp.watch('dev/sass/*.*', gulp.series('sass'))   // следим за всеми файлами sass в директории dev/sass в случае изменения вызываем sass
});

gulp.task('watch-html', function () {
    gulp.watch('dev/*.html', gulp.series('html'))   // следим за всеми файлами html в директории dev в случае изменения вызываем html
});

gulp.task('watch-img', function () {
    gulp.watch('dev/img/**/*.*', gulp.series('img'))   // следим за всеми файлами в директории img в случае изменения вызываем img
});

gulp.task('watch-css', function () {
    gulp.watch('dev/css/**/*.*', gulp.series('css'))   // следим за всеми файлами в директории css в случае изменения вызываем css
});

gulp.task('watch-fonts', function () {
    gulp.watch('dev/fonts/**/*.*', gulp.series('fonts'))   // следим за всеми файлами в директории fonts в случае изменения вызываем fonts
});

gulp.task('watch-js', function () {
    gulp.watch('dev/js/**/*.*', gulp.series('js'))   // следим за всеми файлами в директории js в случае изменения вызываем js
});

gulp.task('watch-libs', function () {
    gulp.watch('dev/libs/**/*.*', gulp.series('libs'))   // следим за всеми файлами в директории libs в случае изменения вызываем libs
});


gulp.task('directories', function () {                 // создаём структуру папок для разработки. Рабочая среда в директории dev
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('./dev/css'))
        .pipe(gulp.dest('./dev/fonts'))
        .pipe(gulp.dest('./dev/img'))
        .pipe(gulp.dest('./dev/js'))
        .pipe(gulp.dest('./dev/libs'))
        .pipe(gulp.dest('./dev/sass'))
        .pipe(gulp.dest('./build/css'))
        .pipe(gulp.dest('./build/fonts'))
        .pipe(gulp.dest('./build/img'))
        .pipe(gulp.dest('./build/js'))
        .pipe(gulp.dest('./build/libs'))
});

gulp.task('create-html-sass', function () {                    // создаём структуру папок для разработки. Рабочая среда в директории dev
    return gulp.src('*.html')                          // перемещаем все файлы html в build
            .pipe(gulp.dest('dev')),
            gulp.src('*.sass')
            .pipe(gulp.dest('dev/sass'))
});

gulp.task('copy', function () {
    return gulp.src('dev/*.html')                          // перемещаем все файлы в build
        .pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series(
    gulp.parallel('sass','watch-sass','watch-html','watch-img','watch-css','watch-fonts','watch-js','watch-libs', 'serve')           // запускаем паралельно три таска sass, serve, watch
));

gulp.task('start', gulp.series(
    'directories',
    'create-html-sass',
    'copy'
));

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});