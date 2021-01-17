const express =require('express'),
      bodyParser= require('body-parser'),
      routes=require('./routers/index'),
      path=require('path'),
      port=3200


//invoca a express
const app =express();

//carpeta public
app.use('/assets',express.static( __dirname +'/public'));

//app.use(express.static('public'));
// Habilitar Pug
app.set('view engine', 'pug');

//habilita rutas
app.use('/', routes() );

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.listen(port,()=>console.log(`Servidor activo por el puerto ${port}`,__dirname));