import { src, dest, watch, series, parallel } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean';

const sass = gulpSass(dartSass);

// Tarea para limpiar la carpeta 'dist'
export function cleanDist() {
    return src('dist', { allowEmpty: true, read: false })
        .pipe(clean());
}

// Tarea para mover archivos JS al directorio 'dist'
export function js(done) {
    src('src/js/app.js')
        .pipe(dest('dist/js'));
    done();
}

// Tarea para compilar archivos Sass y moverlos al directorio 'dist'
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css', { sourcemaps: true }));
    done();
}

// Tarea para observar cambios y ejecutar las tareas correspondientes
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

// Definir la tarea 'build' para limpiar y construir los archivos en 'dist'
export const build = series(cleanDist, parallel(js, css));

// Exportar por defecto la tarea 'build' seguida de 'dev'
export default series(build, dev);




//Export da acceso a que lo llames desde el package.json
// export function hola(done) { 
//     console.log('hola desde gulpfile.js');

//     done();
//     //finaliza gulpfile para detener esa funcion y evitar el siguiente error al correr
//     //The following tasks did not complete: hola
// //Did you forget to signal async completion?
//  }