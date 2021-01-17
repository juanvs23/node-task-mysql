const express =require('express');

const router = express.Router()

module.exports= function (){
    router.get('/',(req,res)=>{
        res.render('index',{
            title : "On Dogs: Man's Best Friend"
        });
    })
    return router;
}