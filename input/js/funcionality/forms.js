import axios from 'axios';
import Swal from 'sweetalert2'

/**fecha */
let day = new Date();
let today=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
 

  
//Eliminar Tareas
const deleteTasks=document.querySelectorAll('.delete-task')
if(deleteTasks){
  deleteTasks.forEach((deleteTask,i)=>{
    deleteTask.addEventListener('click',(e)=>{
      Swal.fire({
        title: '¿Desea Borrar esta tarea?',
        text: "Esta a punto de borrar esta tarea de la lista de actividades del proyecto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
        
     
           
            let borrarUrl=`${location.origin}/dashboard/delete-task/${deleteTask.dataset.deleteTarget}`;
            axios.delete(borrarUrl)
            .then(resp=>{
              console.log(resp.data)
                
                Swal.fire({
                  title: `${resp.data}`,
                  icon: 'success',
                  confirmButtonText: 'Regresar al inicio',
                }).then((resp)=>{
                  if (result.isConfirmed) {
                    window.location.href=`${window.location.href}`
                  }
                })
            })     
        }
      })
    })
  })
}
//Editar Tareas
const editTasks= document.querySelectorAll('.edit-task-button');
if(editTasks){
  editTasks.forEach((editTask,i)=>{
    editTask.addEventListener('click',(e)=>{
      const target =[...document.querySelector(`#task-${editTask.dataset.editTarget}`).children][1]
      if(target.classList.contains('task-dont-show')){
        target.classList.remove('task-dont-show')
      }else{
        target.classList.add('task-dont-show')
      }
    })
  })
}
//Eliminar Proyectos
const deleteWork = document.querySelector('#delete-work');
if(deleteWork){
    deleteWork.addEventListener('click',(e)=>{
     
      e.preventDefault();
          Swal.fire({
              title: '¿Desea Borrar este proyecto?',
              text: "Esta a punto de borrar este proyecto y todas las tareas relacionadas a la misma",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, borrar',
              cancelButtonText:'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                  console.log(deleteWork.dataset.workTarget)
                  let borrarUrl=`${location.origin}/dashboard/borrar-proyecto/${deleteWork.dataset.workTarget}`;
                  const params = new URLSearchParams();
                  params.append("status",0)
                  axios.post(borrarUrl,params)
                  .then(resp=>{
                    console.log(resp.data)
                      
                      Swal.fire({
                        title: `${resp.data}`,
                        icon: 'success',
                        confirmButtonText: 'Regresar al inicio',
                      }).then((resp)=>{
                        if (result.isConfirmed) {
                          setTimeout(()=>{
                            window.location.href=`${location.origin}/dashboard/`
                          },300)
                        }
                      })
                  })     
              }
            })
    })
}
//Crear Proyectos
 const newProyect= document.querySelector('#form-new-proyect');
 if (newProyect) {
  const name= newProyect.querySelector('input[name="name"]'),
  startDate=newProyect.querySelector('input[name="startDate"]'),
  enddate=newProyect.querySelector('input[name="enddate"]'),
  descripcion=newProyect.querySelector('[name="descripcion"]')
  name.addEventListener('focus',()=>{
    if (name.classList.contains('invalid')) {
      name.classList.remove('invalid')
    }
  })
  startDate.addEventListener('focus',()=>{
    if (startDate.classList.contains('invalid')) {
      startDate.classList.remove('invalid')
    }
  })
  enddate.addEventListener('focus',()=>{
    if (enddate.classList.contains('invalid')) {
      enddate.classList.remove('invalid')
    }
  })
  newProyect.addEventListener('submit',(e)=>{
    e.preventDefault()
    const url= newProyect.action;
    const alertError=document.querySelector('.alert-errors');
    let errors=``;
    name.addEventListener('focus',()=>{
      
    })
    if (name.value=="") {

        errors+=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span class="alert-icon"><i class="fa fa-times-circle"></i></span>
        <span class="alert-text"><strong>Alerta!</strong> El campo nombre del proyecto  vacio </span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
       
    name.classList.add('invalid')
     
    }
    if (startDate.value=="") {
      errors+=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <span class="alert-icon"><i class="fa fa-times-circle"></i></span>
      <span class="alert-text"><strong>Alerta!</strong> El campo Fecha de inicio vacio</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>`
  startDate.classList.add('invalid')
    }
   
    if (enddate.value=="") {
      
      errors+=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <span class="alert-icon"><i class="fa fa-times-circle"></i></span>
        <span class="alert-text"><strong>Alerta!</strong> El campo Fecha Limite  vacio</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    enddate.classList.add('invalid')
    }
    if(errors==""){
      console.log(name.value,startDate.value,enddate.value,descripcion.value)
      const params = new URLSearchParams();
      params.append("name",name.value)
      params.append("startDate",startDate.value)
      params.append("enddate",startDate.value)
      params.append("descripcion",descripcion.value)
      axios.post(url,params)
      .then(res=>{
        if (res.data==="no existe") {
          console.log('Proyecto guardado con exito')
          Swal.fire({
            title: 'El proyecto creado con exito',
              text: "Ahora accede a tu proyecto des de la barra lateral y crea una nueva tarea",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6', 
              confirmButtonText: 'Aceptar',
          }).then(result=>{
            if (result.isConfirmed) {
              setTimeout(()=>{
                window.location.href=`${location.origin}/dashboard`
              },300)
            }
          })
        }else{
          console.log('El proyecto ya existe, intenta de nuevo')
          Swal.fire({
            title: 'El proyecto ya existe',
              text: "Por favor cambia el nombre del proyecto",
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#3085d6', 
              confirmButtonText: 'Aceptar',
          }).then(result=>{
            if (result.isConfirmed) {
              setTimeout(()=>{
                window.location.href=`${location.origin}/dashboard/nuevo-proyecto`
              },300)
            }
          })
        }
      })
      .catch(error=>console.log(error))
    }else{
      alertError.innerHTML=errors
    }
   
  })
 }