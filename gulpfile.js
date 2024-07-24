import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'


const sass = gulpSass(dartSass);

export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js') )
    done()
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps: true})
     .pipe(sass().on('error', sass.logError))//sass.logError marca errores si algun documento esta mal
     //hace que se ejecute el archivo automaticamente!
     .pipe(dest('build/css', {sourcemaps: true}))
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)

}

export default series(js, css, dev)



//Export da acceso a que lo llames desde el package.json
// export function hola(done) { 
//     console.log('hola desde gulpfile.js');

//     done();
//     //finaliza gulpfile para detener esa funcion y evitar el siguiente error al correr
//     //The following tasks did not complete: hola
// //Did you forget to signal async completion?
//  }