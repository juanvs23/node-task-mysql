const express =require('express');
const ProyectosController = require('../controllers/ProyectosController');
const TareasController = require('../controllers/TareasController');

const router = express.Router()

const { body } = require( 'express-validator' );



module.exports= function (){
    router.get('/dashboard/',ProyectosController.ProyectoHome)
    router.get('/dashboard/nuevo-proyecto',ProyectosController.ProyectoFormulario)
    router.post('/dashboard/proyecto-creado',
    body('name').trim().escape(),
    ProyectosController.NuevoProyecto)
    router.get('/dashboard/editar-proyecto/:id',
    body('name').trim().escape(),
    ProyectosController.EditarProyecto)
    router.post('/dashboard/proyecto-editado/:id',
    body('name').trim().escape(),
    ProyectosController.UpdateProyecto)
    router.get('/dashboard/proyectos/:url',ProyectosController.ProyectoDetails)
    router.post('/dashboard/borrar-proyecto/:id',ProyectosController.BorrarProyecto)
    router.post('/dashboard/nueva-tarea/:url',TareasController.NuevaTarea)
    router.delete('/dashboard/delete-task/:id',TareasController.BorrarTarea)
    router.post('/dashboard/edit-task/:id',
       TareasController.EditTask
    );
    //paginas 404
    router.get('*',ProyectosController.Error404)
    
    return router;
}
