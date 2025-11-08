// =========================================================
// 4. MÓDULO DE EVENTOS E UI (Funções de Usabilidade)
//    NOTA: Mantidas globalmente (fora do DOMContentLoaded) para acessibilidade.
// =========================================================

// Função para abrir/fechar o painel de navegação (Menu Hambúrguer)
function toggleMenu() {
    const navMenu = document.getElementById('menu-principal');
    const bodyElement = document.body;
    
    if (navMenu && bodyElement) {
        navMenu.classList.toggle('menu-aberto'); // Adiciona/Remove a classe CSS
        bodyElement.classList.toggle('no-scroll'); // Bloqueia a rolagem no fundo
    }
}

// Função para garantir que o menu está fechado (Chamada após a navegação SPA)
function fecharMenu() {
    const navMenu = document.getElementById('menu-principal');
    const bodyElement = document.body;
    
    // Verifica se o menu está aberto antes de tentar fechar
    if (navMenu && bodyElement && navMenu.classList.contains('menu-aberto')) {
        navMenu.classList.remove('menu-aberto');
        bodyElement.classList.remove('no-scroll');
    }
}

// =========================================================
// 1. MÓDULO DE ROTEAMENTO/SPA (Controlador Principal)
// =========================================================

// Mapeamento de Rotas: Associa o hash da URL (ex: #home) ao Template HTML
const rotas = {
    '': TemplateHome, // Rota inicial (sem hash)
    '#home': TemplateHome,
    '#projetos': TemplateProjetos,
    '#cadastro': TemplateCadastro
};

// Função de Carregamento de Conteúdo (Core do SPA)
function carregarConteudo() {
    const appRoot = document.getElementById('app-root'); // Contêiner principal do index.html
    const hash = window.location.hash; // Pega o hash da URL
    
    // Encontra o template correspondente, ou volta para a Home se a rota for inválida
    const templateHTML = rotas[hash] || rotas['#home']; 
    
    // 1. Injeta o HTML no elemento app-root
    if (appRoot) {
        appRoot.innerHTML = templateHTML;
    }
    
    // 2. Garante que o menu feche (boa prática de UX)
    fecharMenu();

    // 3. Adiciona eventos aos novos elementos injetados (Formulário, etc.)
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

    // 1. Validação de Consistência (Checkboxes: Deve haver pelo menos 1 selecionado)
    if (interesses.length === 0) {
        erros.push("Por favor, selecione pelo menos uma área de interesse de voluntariado.");
        fieldsetInteresses.classList.add('erro-borda'); // Feedback visual
    } else {
        fieldsetInteresses.classList.remove('erro-borda');
    }
    
    // 2. Validação de Consistência (CPF: Checa se é estritamente numérico)
    const cpfInput = form.querySelector('#cpf');
    const cpfValor = cpfInput.value;
    
    if (cpfValor.length === 11 && isNaN(Number(cpfValor))) {
        erros.push("O CPF deve conter apenas números (sem pontos ou traços).");
    }
    
    // 3. EXIBIÇÃO DE FEEDBACK E SIMULAÇÃO DE ENVIO
    if (erros.length > 0) {
        // Exibe a mensagem de erro formatada (Usando a classe CSS 'alert-error')
        const listaErros = erros.map(function(erro) { return '<li>' + erro + '</li>'; }).join('');
        
        feedbackDiv.innerHTML = `
            <div class="alert alert-error">
                <strong>Opa! Encontramos ${erros.length} problema(s) no seu cadastro:</strong>
                <ul>${listaErros}</ul>
            </div>
        `;
    } else {
        // Simulação de Sucesso
        feedbackDiv.innerHTML = `
            <div class="alert alert-success">
                Cadastro enviado com sucesso! Entraremos em contato em breve.
            </div>
        `;
        form.reset(); // Limpa os campos
        
        // Volta para a home após 3 segundos
        setTimeout(() => {
            window.location.hash = '#home'; 
        }, 3000);
    }
}


// Liga eventos que SÃO INJETADOS no DOM (chamada após a injeção do template)
function adicionarEventos() {
    // Liga a submissão do formulário (o formulário é injetado, então precisa ser ligado aqui)
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão da página
            validarFormulario(formCadastro); 
        });
    }
}

// INICIALIZAÇÃO E LIGAÇÃO DE EVENTOS FIXOS (Executado apenas quando o HTML está pronto)
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Liga o evento do botão FIXO uma única vez!
    const menuIcone = document.getElementById('menu-toggle'); 
    
    if (menuIcone) {
        menuIcone.addEventListener('click', toggleMenu);
    }

    // 2. Inicialização do SPA e monitoramento de URL
    carregarConteudo(); 
    window.addEventListener('hashchange', carregarConteudo);
});


// =========================================================
// 2. MÓDULO DE TEMPLATES (HTML como strings)
//    NOTA: As tags <main> foram removidas para evitar duplicação no SPA.
// =========================================================

const TemplateHome = `
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
`;

const TemplateCadastro = `
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
                <div><input type="checkbox" id="educacao" name="interesse" value="educacao"><label for="educacao">Educação e Conscientização</label></div>
                <div><input type="checkbox" id="administrativo" name="interesse" value="administrativo"><label for="administrativo">Apoio Administrativo (eventos e redes sociais)</label></div>
            </fieldset>

            <div>
                <button type="submit" class="btn btn-primary">Enviar Cadastro</button>
            </div>
        </form>
    </section>
`;

const TemplateProjetos = `
    <h1>Conheça Nossos Projetos de Conservação Marinha</h1>

    <section class="projetos-grid">
        <article class="card-projeto">
            <img src="/Guardioes-do-Mar/assets/imagens/Resgatando_Tartaruga.png" alt="Tartaruga sendo resgatada.">
            <div class="card-content"> 
                <h3>1. Resgate e Reabilitação Marinha</h3>
                <span class="badge badge-conservacao">Prioridade</span>
                <p>Mantemos uma base ativa para resgatar tartarugas feridas ou encalhadas...</p>
            </div>
        </article>

        <article class="card-projeto">
            <img src="/Guardioes-do-Mar/assets/imagens/Saindo_do_ninho.png" alt="Filhotes de tartaruga saindo de um ninho na areia.">
            <div class="card-content">
                <h3>2. Monitoramento de Ninhos e Pesquisa</h3>
                <span class="badge badge-doacao">Pesquisa</span>
                <p>Nossa equipe monitora praias de desova, protege ninhos contra predadores e coleta dados vitais para a ciência. A pesquisa é fundamental para entender e proteger as populações.</p>
            </div>
        </article>

        <article class="card-projeto">
            <img src="/Guardioes-do-Mar/assets/imagens/Palestra.png" alt="Pessoa dando palestra sobre tartarugas para crianças.">
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
                    <li><strong>R$ 50</strong>: Cobre o custo de medicamentos para um filhote resgatado.</li>
                    <li><strong>R$ 150</strong>: Financia uma hora de patrulha de monitoramento de praia.</li>
                    <li><strong>R$ 500</strong>: Compra um kit de primeiros socorros para a base.</li>
                </ul>
            </article>
        </div>
    </section>
`;