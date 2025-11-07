// =========================================================
// 4. MÓDULO DE EVENTOS E UI (Interatividade - Funções Globais)
// =========================================================

function toggleMenu() {
    const navMenu = document.getElementById('menu-principal');
    const bodyElement = document.body;
    
    if (navMenu && bodyElement) {
        navMenu.classList.toggle('menu-aberto');
        bodyElement.classList.toggle('no-scroll');
    }
}

function fecharMenu() {
    const navMenu = document.getElementById('menu-principal');
    const bodyElement = document.body;
    
    if (navMenu && bodyElement && navMenu.classList.contains('menu-aberto')) {
        navMenu.classList.remove('menu-aberto');
        bodyElement.classList.remove('no-scroll');
    }
}

// =========================================================
// 1. MÓDULO DE ROTEAMENTO/SPA (Controlador Principal)
// =========================================================

const rotas = {
    '': TemplateHome, 
    '#home': TemplateHome,
    '#projetos': TemplateProjetos,
    '#cadastro': TemplateCadastro
};

const appRoot = document.getElementById('app-root');

function carregarConteudo() {
    const hash = window.location.hash; 
    const templateHTML = rotas[hash] || rotas['#home']; 
    
    if (appRoot) {
        appRoot.innerHTML = templateHTML;
    }
    
    fecharMenu();
    adicionarEventos(); 
}

// =========================================================
// 3. MÓDULO DE VALIDAÇÃO (Requisito: Consistência de Dados)
// =========================================================

function validarFormulario(form) {
    const feedbackDiv = document.getElementById('feedback-mensagem');
    feedbackDiv.innerHTML = ''; 

    let erros = [];
    const interesses = form.querySelectorAll('input[name="interesse"]:checked');
    const fieldsetInteresses = document.getElementById('fieldset-interesses');

    if (interesses.length === 0) {
        erros.push("Por favor, selecione pelo menos uma área de interesse de voluntariado.");
        fieldsetInteresses.classList.add('erro-borda'); 
    } else {
        fieldsetInteresses.classList.remove('erro-borda');
    }
    
    const cpfInput = form.querySelector('#cpf');
    const cpfValor = cpfInput.value;
    
    if (cpfValor.length === 11 && isNaN(Number(cpfValor))) {
        erros.push("O CPF deve conter apenas números (sem pontos ou traços).");
    }
    
    if (erros.length > 0) {
        const listaErros = erros.map(function(erro) { return '<li>' + erro + '</li>'; }).join('');
        
        feedbackDiv.innerHTML = `
            <div class="alert alert-error">
                <strong>Opa! Encontramos ${erros.length} problema(s) no seu cadastro:</strong>
                <ul>${listaErros}</ul>
            </div>
        `;
    } else {
        feedbackDiv.innerHTML = `
            <div class="alert alert-success">
                Cadastro enviado com sucesso! Entraremos em contato em breve.
            </div>
        `;
        form.reset(); 
        
        setTimeout(() => {
            window.location.hash = '#home'; 
        }, 3000);
    }
}


// Liga eventos que SÃO INJETADOS no DOM
function adicionarEventos() {
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault(); 
            validarFormulario(formCadastro); 
        });
    }
}

// INICIALIZAÇÃO E LIGAÇÃO DE EVENTOS FIXOS (ÚNICA VEZ)
document.addEventListener('DOMContentLoaded', function() {
    // Liga o evento do botão FIXO uma única vez!
    const menuIcone = document.getElementById('menu-toggle'); 
    
    if (menuIcone) {
        menuIcone.addEventListener('click', toggleMenu);
    }

    // Inicialização do SPA
    carregarConteudo(); 
    window.addEventListener('hashchange', carregarConteudo);
});


// ... (Templates Home, Cadastro e Projetos - O conteúdo HTML completo está na resposta anterior)