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
    
    
    const resultado =await Tareas.create({
        tarea:nuevaTarea,
        porcentaje,
        completado,
        proyectoId:id
    })
   if(!resultado) next()
   res.redirect(`/dashboard/proyectos/${req.params.url}`)
};
exports.EditTask =async(req,res,next)=>{
    
    const tareaBuscada =await Tareas.findOne({
        where:{
            id:req.params.id
        }
    })
    let {nuevaTarea,porcentaje,completado}=req.body;

   
   if(!completado){
        let {id,tarea,porcentaje,proyectoId}=tareaBuscada.dataValues
       
        await  tareaBuscada.update({
            tarea:req.body.nuevaTarea,
            porcentaje:req.body.porcentaje,
            completado: 0,   
        })
        .then(()=>console.log('proyecto actualizado con exito'))
        .catch((error)=>{console.log(error)})
    }else{
        let {id,tarea,completado,porcentaje,proyectoId}=tareaBuscada.dataValues

        await  tareaBuscada.update({
            tarea:req.body.nuevaTarea,
            porcentaje:req.body.porcentaje,
            completado: req.body.completado,   
        })
        .then(()=>console.log('proyecto actualizado con exito'))
        .catch((error)=>{console.log(error)})
    } 
    res.redirect(req.headers.referer)
}
//borrar tarea
exports.BorrarTarea= async (req,res)=>{
    await   Tareas.destroy({
        where: {
            id:req.params.id 
         }
    })
    res.send('Tarea borrada')
}