const express =require('express');
const ProyectosController = require('../controllers/ProyectosController');
const TareasController = require('../controllers/TareasController');

const router = express.Router()

const { body } = require( 'express-validator' );



module.exports= function (){
    router.get('/',ProyectosController.ProyectoHome)
    router.get('/nuevo-proyecto',ProyectosController.ProyectoFormulario)
    router.post('/proyecto-creado',
    body('name').trim().escape(),
    ProyectosController.NuevoProyecto)
    router.get('/editar-proyecto/:id',
    body('name').trim().escape(),
    ProyectosController.EditarProyecto)
    router.post('/proyecto-editado/:id',
    body('name').trim().escape(),
    ProyectosController.UpdateProyecto)
    router.get('/proyectos/:url',ProyectosController.ProyectoDetails)
    router.delete('/borrar-proyecto/:id',ProyectosController.BorrarProyecto)
    router.post('/nueva-tarea/:url',TareasController.NuevaTarea)
    //paginas 404
    router.get('*',ProyectosController.Error404)
    
    return router;
}
