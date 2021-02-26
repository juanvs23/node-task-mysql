import axios from 'axios';
import Swal from 'sweetalert2'
import validator from 'validator'
import  passwordStrength from 'check-password-strength'



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
const invalid=(selector,string,type)=>{
  
  let div=document.createElement('div')
  div.setAttribute('class','invalid-description')
  div.setAttribute('data-acount-field',selector.getAttribute('name'))
  div.setAttribute('id',`alert-${type}-${selector.getAttribute('name')}`)
  if (!document.querySelector(`#alert-${type}-${selector.getAttribute('name')}`)) {
    selector.parentNode.classList.add('isInvalid')
    let text= document.createTextNode(string);
    div.appendChild(text)
    selector.parentNode.insertBefore(div,selector.nextSibling)  
  }
  

}
const clearCondition=(selector)=>{
  selector.addEventListener('focus',()=>{
    const invalidDescriptions = document.querySelectorAll('.invalid-description')
    invalidDescriptions.forEach((invalidDescription,i)=>{
      if (invalidDescription.getAttribute('data-acount-field')==selector.getAttribute('name')) {
        invalidDescription.remove()
      }
    })
  })
}
const passInspect=(selector)=>{
  selector.addEventListener('keyup', event =>{
    const verify=document.querySelector('.verify')
    let ol=document.createElement('ol'),
        smallIndex = document.querySelector('.verify small'),
        indexLavel=  document.querySelector('.verify small span')
      
    if(!document.querySelector('#info-pass-security')){
        ol.setAttribute('id','info-pass-security')
        verify.insertBefore(ol,smallIndex)
        verify.style.visibility="visible"
        verify.style.opacity="1"
     /* schema
           .is().min(8)                                    // Minimum length 8
           .is().max(100)                                  // Maximum length 100
           .has().uppercase()                              // Must have uppercase letters
           .has().lowercase()                              // Must have lowercase letters
           .has().digits(2)                                // Must have at least 2 digits
           .has().not().spaces(); */
           
    }
    console.log(selector.value.length)
    if (selector.value.length >1) {
      

        if (passwordStrength(selector.value).id==0) {
            
                indexLavel.classList.add('text-danger')
                indexLavel.innerHTML='Muy debil'
              
        } 
        if(passwordStrength(selector.value).id==1) {
           
            
                indexLavel.classList.remove('text-danger')
                indexLavel.classList.add('text-warning')
                indexLavel.innerHTML='Debil'
              
        }
        if(passwordStrength(selector.value).id==2){
            
                indexLavel.classList.remove('text-warning')
                indexLavel.classList.add('text-success')
                indexLavel.innerHTML='Fuerte'
              
        }
       
   }
           

  })
}
const showPassword =(showPass, userpass)=>{
  showPass.addEventListener('click',()=>{
    if (userpass.type === "password") {
        userpass.type = "text";
        showPass.innerHTML='<i class="fa fa-eye"></i>'
      } else {
        userpass.type = "password";
        showPass.innerHTML='<i class="fa fa-eye-slash"></i>'
      }
 }) 
}
 //nuevo usuario
 const newUser= document.querySelector('#new-account')
 if (newUser) {
     const username=  newUser.querySelector('[name="username"]');
     const showPass = document.querySelector('#show-pass')
     const email=  newUser.querySelector('[name="usermail"]');
     const userpass =  newUser.querySelector('[name="userpass"]');
     const avatar=`${window.location.origin}/assets/img/upload/user.png`; //'../../../public/img/upload/user.png'
     const url=`${newUser.action}`;
     clearCondition(username)
     clearCondition(email)
     clearCondition(userpass)
     showPassword(showPass, userpass)
     
  passInspect(userpass)

  newUser.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    document.querySelector('#button-submit').innerHTML=`<img src="${window.location.origin}/assets/img/Rolling-1s-24px.svg" >`;
  
    let errors=0
   
    if (validator.isEmpty(username.value) ) {
      errors = errors + 1
      
      invalid(username,'Campo obligatorio','empty');
     
    }
    if (validator.isEmpty(email.value) ) {
      errors = errors + 1
      
      invalid(email,'Campo obligatorio','empty');
     
    }
    if(!validator.isEmail(email.value)){
      errors = errors + 1
      
      invalid(email,'Formato incorrecto','format');
    }
    if (validator.isEmpty(userpass.value)) {
      errors = errors + 1
      
      invalid(userpass,'Contraseña vacia','empty');
    }

	if ( errors >0 ) {
		document.querySelector('#button-submit').innerHTML=`Crear cuenta`;
	}else{
        //username	email	avatar	userpass	role
        const params = new URLSearchParams();
        params.append('username',username.value)
        params.append('email',email.value)
        params.append('userpass',userpass.value)
        params.append('avatar',avatar)
        params.append('role',1)

        axios.post(url,params)
        .then(res=>{
            if (res.data=='exito') {
                Swal.fire({
                    title: 'Tú cuenta ha sido creada',
                    text: "Bienvenido a Uptask",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                   
                    confirmButtonText: 'Continuar',
                   
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.href=`${location.origin}/login`
                    }
                  })
            } else if(res.data=='email existe') {
                Swal.fire({
                    title: 'El correo ya existe',
                    text: "¿Su correo ya ha sido utilizado para crear una cuenta en uptask?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonText:'No tengo cuenta',
                    confirmButtonText: 'Si tengo una cuenta',
                    cancelButtonColor: '#d33',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(()=>{
                            location.href=`${location.origin}/login`
                        },300)
                    }else{
                        newUser.querySelector('[name="usermail"]').focus({preventScroll:false})
                        newUser.querySelector('[name="usermail"]').scrollIntoView()
                        document.querySelector('#button-submit').innerHTML=`Crear cuenta`;
                      
                    }
                  })
            }else{
                Swal.fire({
                    title: 'El correo ya existe',
                    text: "¿Su correo ya ha sido utilizado para crear una cuenta en uptask?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonText:'No tengo cuenta',
                    confirmButtonText: 'Si tengo una cuenta',
                    cancelButtonColor: '#d33',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(()=>{
                            location.href=`${location.origin}/login`
                        },300)
                    }else{
                        newUser.querySelector('[name="usermail"]').focus({preventScroll:false})
                        newUser.querySelector('[name="usermail"]').scrollIntoView()
                        document.querySelector('#button-submit').innerHTML=`Crear cuenta`;
                      
                    }
                  })
            }
        })
    }

    //axios.post()
  })
 }

 //login
 const loginUser = document.querySelector('#login-account')
 if(loginUser){
  const showPass = document.querySelector('#show-pass')
  const email=  loginUser.querySelector('[name="usermail"]');
  const userpass =  loginUser.querySelector('[name="userpass"]');
  showPassword(showPass, userpass)
 }