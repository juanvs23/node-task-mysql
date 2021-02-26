const { Secuelize, DataTypes } =require('sequelize');
const slug = require('slug');
const connect = require('../configs/connect');
const  { default: ShortUniqueId }  = require('short-unique-id');
const Proyectos = require('./ProyectosModel')

const Tareas= connect.define('tareas',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    }, 
    tarea :  DataTypes.STRING(100),
    completado:DataTypes.INTEGER(1),
    porcentaje:DataTypes.INTEGER(3)
},
{
    timestamps: false, 
  })
  Tareas.belongsTo(Proyectos)

module.exports=Tareas