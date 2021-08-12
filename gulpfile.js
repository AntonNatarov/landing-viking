const gulp        = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const pug         = require('gulp-pug');
const rimraf      = require('rimraf');


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    browserSync.watch('build/').on('change', browserSync.reload); 
});

//rimraf - clean build 
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});

//pug compile 
gulp.task('page:compile', function() {
    return gulp.src('./src/pages/*.pug')
        .pipe(
            pug({
                pretty:true
            })
        )
    .pipe(gulp.dest('./build'));
});

//sass compile 
gulp.task('style:compile', function(){
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

//copy images to build
gulp.task('copy:images', function(){
    return gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./build/images'));
});

//copy fonts to build
gulp.task('copy:fonts', function(){
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'));
});

//copy fonts Awesome to build
gulp.task('copy:fontsAwesome', function(){
    return gulp.src('./src/styles/fontawesome-free-5.15.4-web/**/*.*')
        .pipe(gulp.dest('./build/css/fontawesome-free-5.15.4-web'));
});

//copy fonts + images to build
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:fontsAwesome'));

//gulp watches
gulp.task('watch', function(){
    gulp.watch('./src/styles/**/*.scss', gulp.series('style:compile'));
    gulp.watch('./src/pages/**/*.pug', gulp.series('page:compile'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('page:compile', 'style:compile', 'copy'),
    gulp.parallel('watch', 'server')
));