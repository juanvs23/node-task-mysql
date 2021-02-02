const proyectos =require('../models/ProyectosModel')
const Tareas= require('../models/tareasModel')
//const slug = require('slug')
let day = new Date();
let today=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`

exports.ProyectoHome=async (req,res)=>{
const allProyectos= await proyectos.findAll();
 
    res.render('index',{
        title : "On Dogs: Man's Best Friend",
        titleBar:"Inicio",
        allProyectos
      
    });
}

exports.ProyectoFormulario=async (req,res)=>{
    const allProyectos= await proyectos.findAll();
  
    res.render('pages/nuevo-proyecto',{
        title : "Nuevo proyecto",
        today,
        titleBar:"Añadir proyecto",
        allProyectos
    });

}
exports.ProyectoDetails= async (req,res)=>{
    const allProyectos= await proyectos.findAll();
   const proyecto= await proyectos.findOne({
       where:{
           url:req.params.url
       }
   })
   const alltareasbyProyecto =await Tareas.findAll({
    where:{
        proyectoId:proyecto.id
    }
   })
   console.log(proyecto.id)
   if(!proyecto){
    res.render('pages/error404',{
        title :`Error 404`,
       
        titleBar:`El proyecto no existe`,
        allProyectos,
       
       
    });
   }else{
       res.render('pages/tareas',{
        title :`Editar tareas en ${proyecto.nombre}`,
        today,
        titleBar:`Tareas en ${proyecto.nombre}`,
        allProyectos,
        proyecto,
        alltareasbyProyecto
    });
   }
}
exports.NuevoProyecto=async(req,res)=>{
    const allProyectos= await proyectos.findAll();
   

    if (req.body.name=="" || req.body.startDate=="" || req.body.enddate ==""|| req.body.enddate==today ) {
        let errorArray=[]
        if (req.body.name=="") {
             errorArray.push( {
                texto:"Nombre de proyecto Vacio"
               })
            }
        if (req.body.startDate=="") {
            errorArray.push( {
                texto:"Fecha de inicio del proyecto Vacio"
                })
            }
        if (req.body.enddate=="") {
        errorArray.push( {
            texto:"Fecha de fin del proyecto Vacio"
            })
        }
        res.render('pages/nuevo-proyecto',{
            title : "Nuevo proyecto",
            today,
            titleBar:"Añadir proyecto",
            errors: errorArray,
            allProyectos

           
            
        });
    } else {
       
        proyectos.create({
            nombre:req.body.name,
            descripcion:req.body.descripcion,
            startDate: req.body.startDate,
            endDate: req.body.startDate
        })
        .then(()=>console.log('exito proyecto guardado'))
        .catch((error)=>{console.log(error)})
        res.render('pages/nuevo-proyecto',{
            title : "Uptask",
            titleBar:"Inicio",
            success:[
                {
                    texto:"¡El proyecto a sido guardado con exito!"
                }
            ],
            allProyectos
        });
    }
   
};
exports.EditarProyecto=async(req,res)=>{
    const allProyectos= await proyectos.findAll();
    const proyecto= await proyectos.findOne({
        where:{
            id:req.params.id
        }
    })
    if(!proyecto){
        //proyecto no encontrado
     res.render('pages/error404',{
         title :`Error 404`,
        
         titleBar:`El proyecto no existe`,
         allProyectos,
        
     });}else{
         res.render('pages/nuevo-proyecto',{
            title : "Nuevo proyecto",
            today,
            titleBar:"Añadir proyecto",
            allProyectos,
            proyecto
           
            
        })
     }
}
exports.UpdateProyecto =async  (req,res) => {
    const allProyectos= await proyectos.findAll();
    const proyecto= await proyectos.findOne({
        where:{
            id:req.params.id
        }
    })
    console.log( proyecto)

   if (req.body.name=="" || req.body.startDate=="" || req.body.enddate ==""|| req.body.enddate==today ) {
        let errorArray=[]
        if (req.body.name=="") {
             errorArray.push( {
                texto:"Nombre de proyecto Vacio"
               })
            }
        if (req.body.startDate=="") {
            errorArray.push( {
                texto:"Fecha de inicio del proyecto Vacio"
                })
            }
        if (req.body.enddate=="") {
        errorArray.push( {
            texto:"Fecha de fin del proyecto Vacio"
            })
        }
        res.render('pages/nuevo-proyecto',{
            title : "Nuevo proyecto",
            today,
            titleBar:"Añadir proyecto",
            errors: errorArray,
            allProyectos

           
            
        });
    } else {
       
      await  proyecto.update({
            nombre:req.body.name,
            descripcion:req.body.descripcion,
            startDate: req.body.startDate,
            endDate: req.body.startDate
        })
        .then(()=>console.log('proyecto actualizado con exito'))
        .catch((error)=>{console.log(error)})
        res.render('pages/nuevo-proyecto',{
            title : "Uptask",
            titleBar:"Inicio",
            successUpdate:[
                {
                    texto:"¡El proyecto a sido guardado con exito!"
                }
            ],
            allProyectos
        });
    } 

}
//borrar proyectos
exports.BorrarProyecto= async(req,res)=>{
    await   proyectos.destroy({
        where: {
           id:req.params.id 
        }
     })  
     res.send('Archivo borrado')
}


//errores de pagina no encontrada
exports.Error404=async(req,res,next)=>{
    const allProyectos= await proyectos.findAll();
    res.status(404)
    res.render('pages/error404',{
        title :`Error 404`,
       
        titleBar:`Pagina desconocida`,
        allProyectos,
       
    })
}
