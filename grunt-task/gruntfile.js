// 实现这个项目的构建任务
const sass = require('sass');
// const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
    //编译文件
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'release/css/main.css': 'src/assets/styles/main.scss'
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'release/js/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        // 监视文件
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/**/*.scss'],
                tasks: ['sass']
            }
        }
    })

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // loadGruntTasks(grunt);

    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}





