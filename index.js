const express =require('express'),
      bodyParser= require('body-parser'),
      routes=require('./routers/index'),
      path=require('path'),
      port=3200

const connect = require('./configs/connect');
const helpers = require('./helpers')

//invoca a express
const app =express();
//habilitar body parser
app.use(bodyParser.urlencoded({extended:false}))
//carpeta public
app.use('/assets',express.static( __dirname +'/public'));

//carga de modelos
require('./models/ProyectosModel')

//cargar conexion
connect.sync()
    .then(()=>console.log('conectado'))
//app.use(express.static('public'));
// Habilitar Pug
app.set('view engine', 'pug');

//agregar varDump
app.use((req,res,next)=>{
    res.locals.vardump=helpers.varDump;
    next();
})
//Agregar fecha
app.use((req,res,next)=>{
    res.locals.timeDate=helpers.timeDate
    
    next()
})

//habilita rutas
app.use('/', routes() );

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.listen(port,()=>console.log(`Servidor activo por el puerto ${port}`,__dirname));