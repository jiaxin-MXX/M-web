const{src,dest,series,parallel,watch}=require('gulp')
const path=require('path')
const connect=require('gulp-connect')
const sass=require('gulp-sass')
const webpack=require('webpack-stream')
const proxy = require('http-proxy-middleware')


const devPath='../../dev'
function copyhtml(){
    return src('../*.html')
    .pipe(dest(devPath))
    .pipe(connect.reload())
}
//copylibs
function copylibs() {
    return src('../libs/**/*')
      .pipe(dest(`${devPath}/libs`))
}


function copyassets() {
    return src('../assets/**/*')
      .pipe(dest(`${devPath}/assets`))
      .pipe(connect.reload())
}
//编译scss
function  packSCSS(){
    return src(['../styles/*.scss','!./src/styles/yo/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${devPath}/styles/`))
    .pipe(connect.reload())
}


//编译js
function packJS(){
    return src('../scripts/app.js')
    .pipe(webpack({
        mode:'development',
        entry:'../scripts/app.js',
        output:{
            path:path.resolve(__dirname,devPath),
            filename:'app.js'
        },
        module:{
            rules:[
                {
                    test:/\.html$/,
                    loader:'string-loader'
                },
                {
                    test:/\.art$/,
                    loader:'art-template-loader'
                }
            ]
        }
    }))
    .pipe(dest(`${devPath}/scripts`))
    .pipe(connect.reload())
}
function gulpServer(){
    return connect.server({
        name:'Dist App',
        root:devPath,
        port:8000,
        // open: true,
        // host: '10.9.49.205',
        livereload:true,
        middleware:()=>{
            return[
                proxy('/api',{
                    target:'https://shopapi.smartisan.com',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/api':''
                    }
                }),
                proxy('/dev',{
                    target:'http://localhost:4000',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/dev':''
                    }
                })
            ]
        }
    })
}

//watch
function watchFiles(){
    watch('../*.html',series(copyhtml))
    watch('../**/*',series(packJS))
    watch('../**/*.scss',series(packSCSS))
    watch('../assets/*', series(copyassets))
}

exports.default=series(parallel(copyhtml,copyassets,copylibs,packSCSS, packJS), parallel(gulpServer, watchFiles))