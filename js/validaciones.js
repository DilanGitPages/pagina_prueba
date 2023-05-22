
const input_birth=document.querySelector("#birth")

input_birth.addEventListener("blur",(evento)=>{
   validar_fecha_birth(evento.target)
})


export function valida(input)
{
  const tipo_input=input.dataset.tipo//tipo es el nombre del data-tipo
  if(valida[tipo_input])
  {
    valida[tipo_input](input)
  }
  
  if(input.validity.valid)//si es valido, osea si es true cuado cumple los requisitos de input
  {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML="";
  }
  else
  {
    console.log('else mensage')
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrar_mensaje_error(tipoInput,input);
    console.log('mensagee1',mostrar_mensaje_error(tipo_input,input));
  }
  
}


const tipo_error=[
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]





const mensage_error={
  nombre: {
    valueMissing: "Este campo no puede estar vacio"
  },
  email: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "Este campo no puede estar vacio",
    patterMismatch: "Almenos 8 caracteres y una letra mayuscula"
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes ser mayor de 18 años de edad"
  },
}


function mostrar_mensaje_error(tipoInput,input)
{
  console.log('mensage 1')
  let mensage=""
  tipo_error.forEach((error)=> {
    if(input.validity[error])
    {
        console.log(error);
        console.log(mensage_error[tipoInput][error]);
        mensage=mensage_error[tipoInput][error];
    }
  });
  return mensage;
}



const validaciones ={
    nacimiento: (input)=> validar_fecha_birth(input)
}

function validar_fecha_birth(input)
{
    const fecha_usuario=new Date(input.value);
    let mensaje="";
    if(mayor_edad(fecha_usuario)==false)
    {
        mensaje="Tienes que ser mayor de 18 años de edad"
    }
    input.setCustomValidity(mensaje)
    
    
}

function mayor_edad(fecha)//full UTC input date para buscar en google
{
   const fecha_actual=new Date();
   const diferiencia_fechas=new Date(
   fecha.getUTCFullYear()+18,
   fecha.getUTCMonth(),
   fecha.getUTCDate())
   return diferiencia_fechas <= fecha_actual;
}