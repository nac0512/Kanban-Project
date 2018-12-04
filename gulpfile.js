
const gulp        = require('gulp');
const browserSync = require('browser-sync')
const sass        = require('gulp-sass');

const server = browserSync.create()

const src = {
    scss: 'scss/**/*.scss',
    css:  'css',
    html: '*.html'
};

function css() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
}

function reload(done) {
    server.reload()
    done()
}

function serve(done) {
    server.init({
        server: {
            baseDir: './'
        }
    })
    done()
}

const watch = () => gulp.watch([src.scss, src.html], gulp.series(css, reload))

const dev = gulp.series(css,serve,watch)
exports.default = dev