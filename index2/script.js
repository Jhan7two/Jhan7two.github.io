let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4; // Cambiado currenitem a currentItem

loadMoreBtn.onclick = () => { // Cambiado , por . en loadMoreBtn.onclick
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4; i++) { // Corregido el bucle for
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody'); // Cambiado #lista-carrito a #lista-carrito tbody
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();
function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento); // Cambiado , por .
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); // Cambiado , por .
}

function comprarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;

        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a> <!-- Cambiado ide a id -->
        </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}
