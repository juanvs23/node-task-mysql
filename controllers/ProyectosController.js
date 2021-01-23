const proyectos =require('../models/ProyectosModel')
//const slug = require('slug')
let day = new Date();
let today=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`

exports.ProyectoHome=async (req,res)=>{
const allProyectos= await proyectos.findAll();
  console.log(allProyectos)
    res.render('index',{
        title : "On Dogs: Man's Best Friend",
        titleBar:"Inicio",
        allProyectos
    });
}

exports.ProyectoFormulario=async (req,res)=>{
    const allProyectos= await proyectos.findAll();
    console.log(allProyectos)
    res.render('pages/nuevo-proyecto',{
        title : "Nuevo proyecto",
        today,
        titleBar:"Añadir proyecto",
        allProyectos
    });

}
exports.NuevoProyecto=async(req,res)=>{
    const allProyectos= await proyectos.findAll();
    console.log(allProyectos)

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
           
            startDate: req.body.startDate,
            endDate: req.body.startDate
        })
        .then(()=>console.log('exito proyecto guardado'))
        .catch((error)=>{console.log(error)})
        res.render('index',{
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
   
}
