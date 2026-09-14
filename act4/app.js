// ==========================================
// ASIGNATURA: Desarrollo de Sistemas Web
// ACTIVIDAD: Manipular el DOM (Plantilla Base)
// ==========================================

// Reto 1: Selección y Modificación Estática ---
// 1. Selecciona el elemento con ID 'titulo-principal' y cambia su texto a "Mi Panel de Control"
// 2. Selecciona el párrafo con la clase 'descripcion' y cambia su color de fuente y tamaño utilizando .style

let title = document.getElementById('titulo-principal');

title.textContent = 'Mi panel de Control';

// Reto 2: Escucha de Eventos (Captura) ---
// 1. Selecciona el botón 'btn-agregar' y el input 'nueva-tarea'
// 2. Agrega un escuchador de eventos (addEventListener) para el clic del botón
// 3. Captura el valor del input y muéstralo en la consola (console.log)

let addInput = document.getElementById('nueva-tarea');
let addButton = document.getElementById('btn-agregar');

let printInput = () => {
    const text = addInput.value;
    console.log(text);
};

addButton.addEventListener('click', printInput);

// Reto 3: Creación Dinámica de Nodos ---
// 1. Selecciona el contenedor 'lista-tareas' (el elemento <ul>)
// 2. Modifica el evento del Reto 2 para que, en lugar de usar console.log:
//    a) Crea un nuevo elemento 'li' usando document.createElement()
//    b) Asigna el texto del input al nuevo 'li' usando .textContent
//    c) Inserta el 'li' dentro del '<ul>' usando .appendChild()
//    d) Limpia el valor del input y devuélvele el foco (.focus())

let tasksList = document.getElementById('lista-tareas');

let addListElement = () => {
    const text = addInput.value;
    const newListElement = document.createElement('li');
    newListElement.textContent = text;
    tasksList.appendChild(newListElement);
    addInput.value = '';
    addInput.focus();
};

addButton.removeEventListener('click', printInput);
addButton.addEventListener('click', addListElement);

// Reto 4: Eliminación y Delegación de Eventos ---
// 1. Agrega un escuchador de eventos al contenedor PADRE ('lista-tareas')
// 2. Utiliza el objeto de evento (e.target) para comprobar si el elemento clickeado es un 'LI'
// 3. Si es un 'LI', elimínalo del DOM usando el método .remove()

let removeElementList = (e) => {
    const elementList = e.target;

    if (elementList.tagName === 'LI') {
        elementList.remove();
    };
}

tasksList.addEventListener('click', removeElementList);
