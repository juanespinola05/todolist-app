
// los import siempre primeros

// import tareas from "./state.js"
let listaDeTareas = []

// buscar  elementos en el dom
const formulario = document.getElementById("form")
const ulDeTareas = document.getElementById("lista-tareas") // camel case
const pendientesSpan = document.getElementById("pendientes")
const btnBorrar = document.getElementById("btn-borrar")

//*Estado
//? tareas.length la cantidad de items

//? SUBMINT = enviar 

formulario.onsubmit = function (event) {
  event.preventDefault() // prevenir el comportamiento por defecto
  const userText = formulario.tarea.value // ? valor del input llamado "tarea"
  addTarea(userText) // ? añadir tarea
  formulario.tarea.value = "" // ? vaciar input
}

function addTarea(nuevaTarea) {
  listaDeTareas.push(nuevaTarea)
  save()
  // ? crear el li
  const li = document.createElement('li')
  // ? le doy la tarea dentro
  li.textContent = nuevaTarea
  // ? añadir elemento li al ul
  ulDeTareas.appendChild(li) // ? Insertar un hijo
  //ulDeTareas.innerHTML = ulDeTareas.innerHTML + "<li id='item" + listaDeTareas.length + "'>" + nuevaTarea + "</li>"

  // ? .innerHMTL .innerText .textContent
  pendientesSpan.textContent = listaDeTareas.length // ? longitud

  li.onclick = function () {
    li.remove() // ? eliminar del html
    // ? Encontrar la posición de la tarea
    const indice = listaDeTareas.findIndex(function (item) {
      return item === nuevaTarea
    })
    listaDeTareas.splice(indice, 1)
    save()
    pendientesSpan.textContent = listaDeTareas.length // ? actualizar el numero
  }
}

btnBorrar.onclick = function () {
  // ? Vaciar la lista de tareas
  listaDeTareas = []
  save()
  // listaDeTareas.length = 0
  // ? Actualizar pendientesSpan a 0
  pendientesSpan.textContent = listaDeTareas.length
  // ? eliminar todos los li dentro del ulDeTareas
  ulDeTareas.innerHTML = ""
}

function save() {
  // ? Se toma a la lista y se la transoforma en un string
  const listaDeTareasEnTexto = JSON.stringify(listaDeTareas)

  localStorage.setItem('listaDeTareas', listaDeTareasEnTexto)
}

// ? La fn que se ejecuta al principio y carga tareas si las hay en localStorage
function init() {
  // ? Leer la tarea | PUEDE SER NULL
  const listaDeTareasEnTexto = localStorage.getItem('listaDeTareas')
  // ? Transforma en un array
  const array = JSON.parse(listaDeTareasEnTexto)
  // ? Si es null, asigno una lista vacía, sino la propia que leí de ls
  let arrayAuxiliar
  if (array === null) {
    arrayAuxiliar = []
  } else {
    arrayAuxiliar = array
  }
  arrayAuxiliar.forEach(function (item) {
    addTarea(item)
  })
}
init()
