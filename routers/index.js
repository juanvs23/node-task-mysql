const express =require('express');
const ProyectosController = require('../controllers/ProyectosController')

const router = express.Router()

const { body } = require( 'express-validator' );



module.exports= function (){
    router.get('/',ProyectosController.ProyectoHome)
    router.get('/nuevo-proyecto',ProyectosController.ProyectoFormulario)
    router.post('/nuevo-proyecto',
    body('name').trim().escape(),
    ProyectosController.NuevoProyecto)
    router.get('/editar-proyecto/:id',
    body('name').trim().escape(),
    ProyectosController.EditarProyecto)
    router.post('/proyecto-editado/:id',
    body('name').trim().escape(),
    ProyectosController.UpdateProyecto)
    router.get('/proyectos/:url',ProyectosController.ProyectoDetails)
    router.get('/borrar-proyecto/:id',ProyectosController.BorrarProyecto)
    return router;
}