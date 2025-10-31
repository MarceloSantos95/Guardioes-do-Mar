// 1. FUNÇÃO PRINCIPAL PARA ALTERNAR O MENU


document.addEventListener('DOMContentLoaded', function() {
    
    const menuIcone = document.querySelector('.menu-hamburguer');
    const navMenu = document.querySelector('nav');
    const bodyElement = document.body;
    
    function toggleMenu() {
        
        navMenu.classList.toggle('menu-aberto');
        
        
        bodyElement.classList.toggle('no-scroll'); 
    }

    if (menuIcone) {
        menuIcone.addEventListener('click', toggleMenu);
    }
});