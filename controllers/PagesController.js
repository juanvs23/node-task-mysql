exports.HomePages=async (req,res)=>{
   
    res.render('pages/home',{
          title : "Home",
              
      })  
         
  }
exports.Page404= async (req,res)=>{
    res.status(404)
        .render('pages/page404',{
            title:"Hubo un error aca"
        })
}