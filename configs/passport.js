const passport= require('passport'),
     localStrategy = require('passport-local').Strategy,
     Usuarios= require('../models/UsuarioModel')


     passport.use(new localStrategy(
         {
             usernameField:'usermail',
             passwordField:'userpass',
             passReqToCallback : true
         },
         async( req,email,password,done)=> {
        
         try {
                 const usuario= await Usuarios.findOne({
                     where:{
                         email:email
                     }
                 })

                 if (!usuario.checkPassword(password)) {
                    
                    return done(null,false,req.flash('error_pass', 'Contraseña incorrecta'))
                 }
                 return done(null,usuario)
             } catch (error) {
                 return done(null,false,req.flash('error_email', 'Email desconocidos'))
             } 
         } 
     ))

//serializar
passport.serializeUser((usuario,callback)=>{
    callback(null, usuario)
})

//desserializar
passport.deserializeUser((usuario,callback)=>{
    callback(null, usuario)
})

module.exports = passport