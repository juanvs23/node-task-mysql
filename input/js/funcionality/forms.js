import axios from 'axios';
import Swal from 'sweetalert2'
/* 
const formNewProyect = document.querySelector('#form-new-proyect');
if (formNewProyect) {
    formNewProyect.addEventListener('submit',(e)=>{
        
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                let  formData = new FormData(),
                     url=formNewProyect.action;
                     let shortUrl= url.substring(location.origin.length,url.length)
                     formData.append("name",formNewProyect.querySelector('[name="name"]').value)
                     formData.append("startDate",formNewProyect.querySelector('[name="startDate"]').value)
                     formData.append("enddate",formNewProyect.querySelector('[name="enddate"]').value)
                     formData.append("descripcion",formNewProyect.querySelector('[name="descripcion"]').value)
                     console.log(url.substring(location.origin.length,url.length))
                     console.log(location.origin.length)
                     axios({
                       method:'POST',
                       data:formData
                      })
                        .then(res=>console.log(res))
                        .catch(error=>console.log(error))
                        
                        for (var value of formData.values()) {
                            console.log(value);
                         }
                         return
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    })
}
 */

 const deleteWork = document.querySelector('#delete-work');
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
                  let borrarUrl=`${location.origin}/borrar-proyecto/${deleteWork.dataset.workTarget}`;
                  axios.delete(borrarUrl)
                  .then(resp=>{
                    console.log(resp.data)
                      
                      Swal.fire({
                        title: `${resp.data}`,
                        icon: 'success',
                        confirmButtonText: 'Regresar al inicio',
                      }).then((resp)=>{
                        if (result.isConfirmed) {
                          setTimeout(()=>{
                            window.location.href=location.origin
                          },300)
                        }
                      })
                  })     
              }
            })
    })
}