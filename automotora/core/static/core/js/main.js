let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick =() => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick =() => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

//ocultar el menú y el cuadro de búsqueda en el desplazamiento//
window.onscroll = () =>{
    menu.classList.remove('active');
    search.classList.remove('active');
}

//header//
let header = documen.querySelector('header');

window.addEventListener('scroll', () =>{
    header.classList.toggle('shadow', window.scroll > 0);
});