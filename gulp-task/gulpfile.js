// 实现这个项目的构建任务

const { src, dest, parallel, series } = require('gulp');
const swig = require('gulp-swig');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

const del = require('del');

//编译文件
const page = () => {
    return src('src/**/*.html', { base: 'src' })
        .pipe(swig())
        .pipe(dest('realse'))
}

const style = () => {
    return src('src/**/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest('realse'))
}

const script = () => {
    return src('src/**/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('realse'))
}

//图片压缩
const image = () => {
    return src('src/**/images/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('realse'))
}
//字体压缩
const font = () => {
    return src('src/**/fonts/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('realse'))
}

//拷贝文件
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('realse'))
}

const clean = ()=>{
    return del(['realse'])
}

const compile = parallel(page, style, script);

// const build = series(clean, parallel(compile, extra));



module.exports = {
    compile,
    image,
    font
}
