exports.varDump=(objeto)=>JSON.stringify(objeto,null,2)

exports.timeDate=()=>{
    const date= new Date();
    let day=date.getDate(),
    months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"),
    month=months[date.getMonth()],
    year=date.getFullYear()
    return{
        day,
        month,
        year
    }
}