// =========================================================
// 4. MÓDULO DE EVENTOS E UI (Interatividade - Funções Globais)
// =========================================================

// FUNÇÕES DE UI MOVIDAS PARA O ESCOPO GLOBAL PARA SEREM ACESSADAS CORRETAMENTE

// Função para abrir/fechar o menu hambúrguer
function toggleMenu() {
    const navMenu = document.querySelector('nav');
    const bodyElement = document.body;
    
    if (navMenu && bodyElement) {
        navMenu.classList.toggle('menu-aberto');
        bodyElement.classList.toggle('no-scroll');
    }
}

// Função para garantir que o menu está fechado (Chamada pelo roteador após a navegação)
function fecharMenu() {
    const navMenu = document.querySelector('nav');
    const bodyElement = document.body;
    
    if (navMenu && bodyElement && navMenu.classList.contains('menu-aberto')) {
        navMenu.classList.remove('menu-aberto');
        bodyElement.classList.remove('no-scroll');
    }
}

// =========================================================
// 1. MÓDULO DE ROTEAMENTO/SPA (Controlador Principal)
// =========================================================

// Mapeamento de Rotas (URLs #hash para Templates)
const rotas = {
    '': TemplateHome, 
    '#home': TemplateHome,
    '#projetos': TemplateProjetos,
    '#cadastro': TemplateCadastro
};

// Encontra o elemento raiz onde o conteúdo será injetado
const appRoot = document.getElementById('app-root');

// Função de Carregamento de Conteúdo (Core do SPA)
function carregarConteudo() {
    const hash = window.location.hash; 
    const templateHTML = rotas[hash] || rotas['#home']; 
    
    // 1. Injeta o HTML
    if (appRoot) {
        appRoot.innerHTML = templateHTML;
    }
    
    // 2. Garante que o menu hambúrguer feche
    fecharMenu();

    // 3. Adiciona eventos específicos (formulário, botões)
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
        const listaErros = erros.map(erro => `<li>${erro}</li>`).join('');
        
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
    // Apenas liga o evento do formulário, que é INJETADO
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault(); 
            validarFormulario(formCadastro); 
        });
    }
    // O evento do menu NÃO é religado aqui!
}

// INICIALIZAÇÃO E LIGAÇÃO DE EVENTOS FIXOS (CORRIGIDO)
document.addEventListener('DOMContentLoaded', function() {
    const menuIcone = document.getElementById('menu-toggle'); 
    
    // Liga o evento do Hambúrguer APENAS UMA VEZ!
    if (menuIcone) {
        menuIcone.addEventListener('click', toggleMenu);
    }

    carregarConteudo(); 
    window.addEventListener('hashchange', carregarConteudo);
});


// =========================================================
// 2. MÓDULO DE TEMPLATES (HTML como strings) - COMPLETO
// =========================================================

const TemplateHome = `
    <main class="container">
        <section class="hero-banner">
            <div class="container hero-content">
                <h1>Guardiões do Mar: Protegendo a Vida Marinha Brasileira</h1>
                <p>Desde 2010, nossa missão é garantir a sobrevivência e a proteção das espécies de tartarugas marinhas em nosso litoral, através de resgate, pesquisa e educação ambiental.</p>
                <a href="#projetos" class="btn btn-secondary">DESCUBRA NOSSOS PROJETOS</a> 
            </div>
        </section>

        <section class="container" style="padding-top: var(--espacamento-xl);">
            <h2>Nossa Missão</h2>
            
            <article>
                <h3>Missão, Visão e Valores</h3>
                <p>Nossa <strong>Missão</strong> é resgatar, reabilitar e soltar tartarugas marinhas feridas, ao mesmo tempo que educamos o público sobre a importância da conservação dos oceanos.</p>
                <p>Nossa <strong>Visão</strong> é um litoral brasileiro livre de lixo e seguro para todas as espécies marinhas.</p>
            </article>

            <aside>
                <h3>Números que Inspiram</h3>
                <ul>
                    <li><strong>+5.000</strong> Ninhos de tartarugas protegidos.</li>
                    <li><strong>+500</strong> Voluntários ativos anualmente.</li>
                    <li><strong>75%</strong> Das tartarugas resgatadas foram reabilitadas.</li>
                </ul>
            </aside>
        </section>
    </main>
`;

const TemplateCadastro = `
    <main class="container">
        <h1>Torne-se um Guardião do Mar</h1>
        <section class="texto-centralizado">
            <h2>Seu Cadastro é o Primeiro Passo para a Conservação!</h2>
            <p>Preencha o formulário abaixo para se juntar à nossa rede de voluntários e proteger as tartarugas marinhas.</p>

            <div id="feedback-mensagem"></div>

            <form id="form-cadastro">
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    
                    <div><label for="nome_completo">Nome Completo:</label><input type="text" id="nome_completo" name="nome_completo" required></div>
                    <div><label for="data_nascimento">Data de Nascimento:</label><input type="date" id="data_nascimento" name="data_nascimento" required></div>
                    <div><label for="cpf">CPF (apenas números):</label><input type="text" id="cpf" name="cpf" required pattern="[0-9]{11}" title="O CPF deve conter exatamente 11 dígitos, apenas números. Ex: 12345678900" placeholder="Ex: 12345678900" maxlength="11"></div>
                    <div><label for="email">E-mail:</label><input type="email" id="email" name="email" required></div>
                    <div><label for="telefone">Telefone:</label><input type="tel" id="telefone" name="telefone" required pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}" title="O telefone deve estar no formato (99) 99999-9999 ou (99) 9999-9999." placeholder="(99) 99999-9999"></div>
                </fieldset>
                
                <fieldset>
                    <legend>Endereço Completo</legend>
                    
                    <div><label for="cep">CEP (apenas números):</label><input type="text" id="cep" name="cep" required pattern="[0-9]{8}" title="O CEP deve conter 8 dígitos, apenas números." placeholder="Ex: 12345678" maxlength="8"></div>
                    <div><label for="endereco">Endereço:</label><input type="text" id="endereco" name="endereco" required></div>
                    <div><label for="cidade">Cidade:</label><input type="text" id="cidade" name="cidade" required></div>
                    <div><label for="estado">Estado:</label><input type="text" id="estado" name="estado" required title="Digite a sigla ou o nome completo do Estado. Ex: SP ou São Paulo" placeholder="Ex: São Paulo"></div>
                </fieldset>

                <fieldset id="fieldset-interesses"> 
                    <legend>Interesses de Voluntariado</legend>
                    
                    <p>Qual tipo de ação dos Guardiões do Mar mais te interessa?</p>
                    <div><input type="checkbox" id="resgate" name="interesse" value="resgate"><label for="resgate">Resgate e Monitoramento de Praias</label></div>
                    <div><input type="checkbox" id="educacao" id="educacao" name="interesse" value="educacao"><label for="educacao">Educação e Conscientização</label></div>
                    <div><input type="checkbox" id="administrativo" name="interesse" value="administrativo"><label for="administrativo">Apoio Administrativo (eventos e redes sociais)</label></div>
                </fieldset>

                <div>
                    <button type="submit" class="btn btn-primary">Enviar Cadastro</button>
                </div>
            </form>
        </section>
    </main>
`;

const TemplateProjetos = `
    <main class="container">
        <h1>Conheça Nossos Projetos de Conservação Marinha</h1>

        <section class="projetos-grid">
            <article class="card-projeto">
                <img src="assets/imagens/Resgatando_Tartaruga.png" alt="...">
                <div class="card-content"> 
                    <h3>1. Resgate e Reabilitação Marinha</h3>
                    <span class="badge badge-conservacao">Prioridade</span>
                    <p>Mantemos uma base ativa para resgatar tartarugas feridas ou encalhadas...</p>
                </div>
            </article>

            <article class="card-projeto">
                <img src="assets/imagens/Saindo_do_ninho.png" alt="Filhotes de tartaruga saindo de um ninho na areia.">
                <div class="card-content">
                    <h3>2. Monitoramento de Ninhos e Pesquisa</h3>
                    <span class="badge badge-doacao">Pesquisa</span>
                    <p>Nossa equipe monitora praias de desova, protege ninhos contra predadores e coleta dados vitais para a ciência. A pesquisa é fundamental para entender e proteger as populações.</p>
                </div>
            </article>

            <article class="card-projeto">
                <img src="assets/imagens/Palestra.png" alt="Pessoa dando palestra sobre tartarugas para crianças.">
                <div class="card-content">
                    <h3>3. Educação Ambiental Comunitária</h3>
                    <span class="badge badge-doacao">Conscientização</span>
                    <p>Realizamos palestras e oficinas em escolas e comunidades litorâneas, incentivando a redução do lixo plástico e a conscientização sobre a poluição marinha.</p>
                </div>
            </article>
        </section>

        <section id="apoie">
            <h2>Como Você Pode Ajudar a Salvar as Tartarugas</h2>
            <div class="flex-apoio">

                <article class="card-apoio">
                    <h3>Seja um Voluntário do Mar</h3>
                    <p>Participe diretamente dos nossos mutirões de limpeza, monitoramento de praias ou atividades de educação. Não é necessário ter experiência prévia, apenas paixão pelo oceano!</p>
                    <p><strong><a href="#cadastro" class="btn btn-secondary">CLIQUE AQUI E FAÇA SEU CADASTRO AGORA!</a></strong></p>
                </article>

                <article class="card-apoio">
                    <h3>Faça uma Doação</h3>
                    <p>Sua contribuição financeira é vital para cobrir custos de reabilitação, equipamentos de monitoramento e combustível para as patrulhas. Todo valor faz a diferença.</p>
                    <h4>Nossas Necessidades Atuais:</h4>
                    <ul class="lista-necessidades">
                        <li><strong>$ 50:</strong> Cobre o custo de medicamentos para um filhote resgatado.</li>
                        <li><strong>R$ 150</strong>: Financia uma hora de patrulha de monitoramento de praia.</li>
                        <li><strong>R$ 500</strong>: Compra um kit de primeiros socorros para a base.</li>
                    </ul>
                </article>
            </div>
        </section>
    </main>
`;