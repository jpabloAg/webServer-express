const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs'); 
require('./hbs/helpers');//con solo requerir los helpers, se cargan automaticamente sin tener que crear una constante para utilizarlos ni nada

//configuramos el puerto
const port = process.env.PORT || 3000;

//------------ Middleware -----------------
/**
 * Para acceder a los archivos estaticos lo hacemos asi:
 * http://localhost:3000/staticFiles/ o http://localhost:3000/staticFiles/index.html
 * http://localhost:3000/staticFiles/about.html
 * si quitase el prefijo staticFiles, para acceder a estos archivos estaticos seria asi:
 * http://localhost:3000/ o http://localhost:3000/index.html
 * http://localhost:3000/about.html
 * Nota: he definido el prefijo staticFiles porque la ruta http://localhost:3000/
 * choca con la ruta 1 '/' que me responde con un json  
 */
//app.use('/staticFiles',  express.static( __dirname + '/public' ) );

app.use(express.static(__dirname + '/public'));

console.log(__dirname);//ruta absoluta hasta la carpeta que contiene a este archovo, osea al archivo server.js
console.log(path.join(__dirname,'public','views'));

//------------ Configurations -----------------
//Express HBS engine
hbs.registerPartials(__dirname+'/public/views/partials');//configuración de los partials, indicamos el directorio donde estaran los parciales
app.set('view engine', 'hbs');//indicamos que template engine utilizaremos para las vistas
app.set('views', __dirname+'/public/views');//indicamos el directorio donde estan nuestras vistas

// Ruta 1
app.get('/', (req, res) => {
    res.render('home', {  
        nombre:'juan pablo agudelo'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact',{
        followers: 13000
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Ruta 3
app.get('/profile', (req, res) => res.send('this is your profile'));


// Ruta 4
app.get('/:edad/:nombre', function(req, res){
    let salida = {
        url1: req.url,
        url2: req.url.split('/')
    }
    res.send(salida);//el metodo send serializa el objeto json, por lo que no tenemos que hacer JSON.stringify(salida)
});

app.listen(port , ( ) => console.log(`Servidor en puerto ${ port }`));
