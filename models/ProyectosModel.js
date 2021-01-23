const { Secuelize, DataTypes } =require('sequelize');
const slug = require('slug');
const connect = require('../configs/connect');
const  { default: ShortUniqueId }  = require('short-unique-id');

const Proyectos= connect.define('proyectos',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre :  DataTypes.STRING(100),
    url : DataTypes.STRING(100),
    startDate: DataTypes.STRING(10),
    endDate: DataTypes.STRING(10)
},
{
    timestamps: false,
    hooks:{
        beforeCreate(producto){
            const uid = new ShortUniqueId();
            const url= slug(producto.dataValues.nombre).toLocaleLowerCase()
            producto.dataValues.url=`${url}-${uid.seq()}`
        }
    }
  })

  
module.exports=Proyectos