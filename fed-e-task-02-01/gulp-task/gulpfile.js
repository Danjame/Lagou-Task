// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp');
const swig = require('gulp-swig');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

const del = require('del');
const browserSync = require('browser-sync');
const bs = browserSync.create();

//编译文件
const page = () => {
    return src('src/**/*.html', { base: 'src' })
        .pipe(swig({defaults: {cache:false}}))
        .pipe(dest('realse'))
        .pipe(bs.reload({stream: true}))
}

const style = () => {
    return src('src/**/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest('realse'))
        .pipe(bs.reload({stream: true}))
}

const script = () => {
    return src('src/**/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('realse'))
        .pipe(bs.reload({stream: true}))
}

//图片压缩
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('realse'))
}
//字体压缩
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('realse'))
}

//拷贝文件
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('realse'))
}
//清除realse文件夹
const clean = () => {
    return del(['realse'])
}

//开启服务器并监视文件变化
const server = () => {
    watch('src/**/*.html', page);
    watch('src/**/*.scss', style);
    watch('src/**/*.js', script);

    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload);

    bs.init(
        {
            server: {
                baseDir: 'realse',
                files: 'realse/**',
                routes: {
                    '/node_modules': 'node_modules'
                }
            }
        }
    )
}

const compile = parallel(page, style, script, font, image);

const build = series(clean, parallel(compile, extra));

module.exports = {
    compile,
    build,
    server,
}
