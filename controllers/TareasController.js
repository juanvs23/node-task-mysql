const proyectos =require('../models/ProyectosModel')
const Tareas= require('../models/tareasModel')
//const slug = require('slug')

let day = new Date();
let today=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`


exports.NuevaTarea= async (req,res,next)=>{
   const proyecto=await proyectos.findOne({
        where:{
            url:req.params.url
        }
    })
    const {id}=proyecto
    const {nuevaTarea,porcentaje,completado}=req.body;
    console.log( nuevaTarea,
        porcentaje,
        completado,
        id)
    
    const resultado =await Tareas.create({
        tarea:nuevaTarea,
        porcentaje,
        completado,
        proyectoId:id
    })
   if(!resultado) next()
   res.redirect(`/proyectos/${req.params.url}`)
};