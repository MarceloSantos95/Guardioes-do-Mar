// 1. FUNÇÃO PRINCIPAL PARA ALTERNAR O MENU
function toggleMenu() {
    
    const nav = document.querySelector('nav');
    
    
    const body = document.body;

    
    nav.classList.toggle('menu-aberto');
    
    
    body.classList.toggle('no-scroll'); 
}


const menuIcone = document.querySelector('.menu-hamburguer');

if (menuIcone) {
    menuIcone.addEventListener('click', toggleMenu);
}