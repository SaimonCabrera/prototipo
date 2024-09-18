let firstMessage = true; // Verifica se é a primeira mensagem do usuário
let contactName = ''; // Variável global para armazenar o nome do contato

// Inicia o chat ao clicar em um contato
function startChat() {
    document.getElementById('contact-screen').style.display = 'none'; // Oculta a tela de contato
    document.getElementById('chat-screen').style.display = 'flex'; // Exibe a tela de chat
    contactName = 'Bot'; // Define o nome do contato
    sendMessage(); // Inicia o chat
}

// Função para enviar a mensagem do usuário
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userMessage = inputField.value;

    if (userMessage.trim() === '') return;
    
    // Adicionar mensagem do usuário
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.innerText = userMessage;
    chatBody.appendChild(userMessageElement);

    // Limpar campo de texto
    inputField.value = '';

    // Adicionar mensagem de boas-vindas e botões se for a primeira mensagem
    if (firstMessage) {
        setTimeout(() => {
            const botMessageElement = document.createElement('div');
            botMessageElement.classList.add('message', 'bot-message');
            botMessageElement.innerText = `Olá! Eu sou Celine, um robô que ajuda a encontrar médicos e farmácias em Alegrete. \n Escolha uma das opções abaixo para eu mostrar o que encontro na cidade.`;
            chatBody.appendChild(botMessageElement);

            // Adicionar botões principais
            showMainOptions();

            chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
        }, 1000);

        firstMessage = false;
    }

    // Scroll para a última mensagem
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Função para mostrar as opções principais ('Médicos' e 'Farmácias')
function showMainOptions() {
    const chatBody = document.getElementById('chat-body');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('bot-buttons');

    const buttonMedicos = document.createElement('button');
    buttonMedicos.classList.add('bot-button');
    buttonMedicos.innerText = 'Médicos';
    buttonMedicos.onclick = () => handleBotOption('Médicos');

    const buttonFarmacias = document.createElement('button');
    buttonFarmacias.classList.add('bot-button');
    buttonFarmacias.innerText = 'Farmácias';
    buttonFarmacias.onclick = () => handleBotOption('Farmácias');

    buttonContainer.appendChild(buttonMedicos);
    buttonContainer.appendChild(buttonFarmacias);
    chatBody.appendChild(buttonContainer);
}

// Função para lidar com as opções selecionadas
function handleBotOption(option) {
    const chatBody = document.getElementById('chat-body');

    // Mostrar a escolha do usuário
    const userChoiceElement = document.createElement('div');
    userChoiceElement.classList.add('message', 'user-message');
    userChoiceElement.innerText = `${option}`;
    chatBody.appendChild(userChoiceElement);

    if (option === 'Médicos') {
        // Responder com áreas médicas
        setTimeout(() => {
            const botResponseElement = document.createElement('div');
            botResponseElement.classList.add('message', 'bot-message');
            botResponseElement.innerText = 'Escolha uma das áreas médicas abaixo:';
            chatBody.appendChild(botResponseElement);

            // Adicionar sub-opções (áreas médicas)
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('bot-buttons');

            const areasMedicas = ['Cardiologia', 'Ortopedia', 'Dermatologia', 'Pediatria'];
            areasMedicas.forEach(area => {
                const button = document.createElement('button');
                button.classList.add('bot-button');
                button.innerText = area;
                button.onclick = () => handleSubOption(area);
                buttonContainer.appendChild(button);
            });

            // Adicionar botão para ver todas as especialidades
            const buttonVerTodas = document.createElement('button');
            buttonVerTodas.classList.add('bot-button');
            buttonVerTodas.innerText = 'Ver todas as especialidades';
            buttonVerTodas.onclick = () => showAllSpecialties();
            buttonContainer.appendChild(buttonVerTodas);


            const buttonVoltarInicio2 = document.createElement('button');
            buttonVoltarInicio2.classList.add('bot-button');
            buttonVoltarInicio2.innerText = 'Voltar ao Início';
            buttonVoltarInicio2.onclick = () => showMainOptions();

            buttonContainer.appendChild(buttonVoltarInicio2);

            chatBody.appendChild(buttonContainer);
            chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
        }, 1000);
    } else if (option === 'Farmácias') {
        // Exibir lista de farmácias
        setTimeout(() => {
            const botResponseElement = document.createElement('div');
            botResponseElement.classList.add('message', 'bot-message');
            botResponseElement.innerText = 'Aqui estão algumas farmácias próximas:';
            chatBody.appendChild(botResponseElement);

            // Dados das farmácias
            const farmacias = [
                { nome: 'Farmácia 1', endereco: 'Rua 2', telefone: '444444' },
                { nome: 'Farmácia 2', endereco: 'Rua 3', telefone: '555555' },
                { nome: 'Farmácia 3', endereco: 'Rua 4', telefone: '666666' }
            ];

            // Adicionar informações das farmácias
            farmacias.forEach(farmacia => {
                const farmaciaElement = document.createElement('div');
                farmaciaElement.classList.add('message', 'bot-message');
                farmaciaElement.innerHTML = `
                    <strong>Nome:</strong> ${farmacia.nome}<br>
                    <strong>Endereço:</strong> ${farmacia.endereco}<br>
                    <strong>Telefone:</strong> ${farmacia.telefone}<br>
                `;

                const buttonFalar = document.createElement('button');
                buttonFalar.innerText = `Falar com ${farmacia.nome}`;
                buttonFalar.onclick = () => speakWithPharmacy(farmacia.nome);
                farmaciaElement.appendChild(buttonFalar);

                chatBody.appendChild(farmaciaElement);
            });

            // Adicionar botão 'Voltar ao Início'
            const buttonVoltarInicio = document.createElement('button');
            buttonVoltarInicio.classList.add('bot-button');
            buttonVoltarInicio.innerText = 'Voltar ao Início';
            buttonVoltarInicio.onclick = () => showMainOptions();
            chatBody.appendChild(buttonVoltarInicio);


            chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
        }, 1000);
    }

    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
}

// Função para lidar com a escolha de sub-opções médicas
function handleSubOption(areaMedica) {
    const chatBody = document.getElementById('chat-body');

    // Mostrar a escolha do usuário
    const userChoiceElement = document.createElement('div');
    userChoiceElement.classList.add('message', 'user-message');
    userChoiceElement.innerText = `${areaMedica}`;
    chatBody.appendChild(userChoiceElement);

    // Dados dos médicos por área médica
    const medicos = {
        'Cardiologia': [
            { nome: 'Dr. João', endereco: 'Rua Augusta', telefone: '999999' },
            { nome: 'Dr. Pedro', endereco: 'Av. Paulista', telefone: '888888' },
            { nome: 'Dr. Carlos', endereco: 'Rua da Consolação', telefone: '777777' },
            { nome: 'Dr. Henrique', endereco: 'Rua Oscar Freire', telefone: '666666' }
        ],
        'Ortopedia': [
            { nome: 'Dr. Marcos', endereco: 'Rua Bela Vista', telefone: '555555' },
            { nome: 'Dr. Felipe', endereco: 'Rua das Flores', telefone: '444444' },
            { nome: 'Dr. Rafael', endereco: 'Av. Brasil', telefone: '333333' },
            { nome: 'Dr. Fernando', endereco: 'Rua Domingos de Moraes', telefone: '222222' }
        ],
        'Dermatologia': [
            { nome: 'Dra. Luiza', endereco: 'Rua Vergueiro', telefone: '111111' },
            { nome: 'Dra. Ana', endereco: 'Av. Rebouças', telefone: '000000' },
            { nome: 'Dra. Paula', endereco: 'Rua dos Três Irmãos', telefone: '121212' },
            { nome: 'Dra. Roberta', endereco: 'Rua Augusta', telefone: '343434' }
        ],
        'Pediatria': [
            { nome: 'Dr. Gustavo', endereco: 'Rua dos Meninos', telefone: '565656' },
            { nome: 'Dr. Felipe', endereco: 'Rua das Crianças', telefone: '787878' },
            { nome: 'Dra. Beatriz', endereco: 'Rua das Mães', telefone: '898989' },
            { nome: 'Dr. Victor', endereco: 'Rua das Estrelas', telefone: '909090' }
        ],
        // Adicione mais especialidades conforme necessário
    };

    // Adicionar informações dos médicos
    const medicosArea = medicos[areaMedica] || [];
    setTimeout(() => {
        if (medicosArea.length > 0) {
            medicosArea.forEach(medico => {
                const medicoElement = document.createElement('div');
                medicoElement.classList.add('message', 'bot-message');
                medicoElement.innerHTML = `
                    <strong>Nome:</strong> ${medico.nome}<br>
                    <strong>Endereço:</strong> ${medico.endereco}<br>
                    <strong>Telefone:</strong> ${medico.telefone}<br>
                `;

                const buttonFalar = document.createElement('button');
                buttonFalar.innerText = `Falar com ${medico.nome}`;
                buttonFalar.onclick = () => speakWithUser(medico.nome);
                medicoElement.appendChild(buttonFalar);

                chatBody.appendChild(medicoElement);
            });
        } else {
            const semDadosElement = document.createElement('div');
            semDadosElement.classList.add('message', 'bot-message');
            semDadosElement.innerText = `Desculpe, não há médicos cadastrados.`;
            chatBody.appendChild(semDadosElement);
        }

        // Adicionar botões 'Voltar' e 'Ver todas as especialidades'
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('bot-buttons');

       

        const buttonVerTodas = document.createElement('button');
        buttonVerTodas.classList.add('bot-button');
        buttonVerTodas.innerText = 'Ver todas as especialidades';
        buttonVerTodas.onclick = () => showAllSpecialties();

        const buttonVoltarInicio2 = document.createElement('button');
        buttonVoltarInicio2.classList.add('bot-button');
        buttonVoltarInicio2.innerText = 'Voltar ao Início';
        buttonVoltarInicio2.onclick = () => showMainOptions();


        buttonContainer.appendChild(buttonVerTodas);
        buttonContainer.appendChild(buttonVoltarInicio2);

        chatBody.appendChild(buttonContainer);

        chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
    }, 1000);
}

// Função para mostrar todas as especialidades médicas
function showAllSpecialties() {
    const chatBody = document.getElementById('chat-body');

    // Informar que está listando todas as especialidades
    const botResponseElement = document.createElement('div');
    botResponseElement.classList.add('message', 'bot-message');
    botResponseElement.innerText = 'Aqui estão todas as especialidades médicas disponíveis:';
    chatBody.appendChild(botResponseElement);

    // Lista completa das especialidades
    const todasEspecialidades = [
        'Cardiologia',
        'Clínica Geral',
        'Dermatologia',
        'Ginecologia e Obstetrícia',
        'Neurologia',
        'Oftalmologia',
        'Oncologia',
        'Ortopedia',
        'Pediatria',
        'Psiquiatria'
    ];

    // Adicionar botões para cada especialidade
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('bot-buttons');

    todasEspecialidades.forEach(especialidade => {
        const button = document.createElement('button');
        button.classList.add('bot-button');
        button.innerText = especialidade;
        button.onclick = () => handleSubOption(especialidade);
        buttonContainer.appendChild(button);
    });

    // Adicionar botões  e 'Voltar ao Início'
   


    const buttonVoltarInicio = document.createElement('button');
    buttonVoltarInicio.classList.add('bot-button');
    buttonVoltarInicio.innerText = 'Voltar ao Início';
    buttonVoltarInicio.onclick = () => showMainOptions();

    buttonContainer.appendChild(buttonVoltarInicio);

    chatBody.appendChild(buttonContainer);

    chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
}

// Função para criar a nova tela de conversa com o médico ou farmácia
function openPrivateChat(entityNumber) {
    // Ocultar a tela do bot e mostrar a nova tela de conversa
    document.getElementById('chat-screen').style.display = 'none';
    document.getElementById('private-chat-screen').style.display = 'flex';

    // Definir o nome da entidade na nova tela de conversa
    document.getElementById('private-contact-name').innerText = `${entityNumber}`;

    // Limpar o histórico da nova tela de conversa
    document.getElementById('private-chat-body').innerHTML = '';
}

// Função para enviar mensagem na nova conversa
function sendPrivateMessage() {
    const inputField = document.getElementById('private-user-input');
    const chatBody = document.getElementById('private-chat-body');
    const userMessage = inputField.value;

    if (userMessage.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.innerText = userMessage;
    chatBody.appendChild(userMessageElement);

    // Limpar campo de texto
    inputField.value = '';

    // Adicionar resposta fictícia da entidade
    setTimeout(() => {
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message', 'bot-message');
        botMessageElement.innerText = `${document.getElementById('private-contact-name').innerText}: Recebemos sua mensagem!`;
        chatBody.appendChild(botMessageElement);

        chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
    }, 1000);
}

// Função para voltar à tela do bot
function backToBot() {
    // Ocultar a tela de conversa privada e mostrar a tela do bot
    document.getElementById('private-chat-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'flex';
}

// Função para reiniciar o bot e voltar à tela inicial
function restartBot() {
    // Limpar o conteúdo da tela de chat
    document.getElementById('chat-body').innerHTML = '';
    // Resetar o estado de primeira mensagem
    firstMessage = true;
    // Voltar à tela de contato
    document.getElementById('chat-screen').style.display = 'none';
    document.getElementById('contact-screen').style.display = 'flex';
}

// Função para enviar mensagem para a entidade (médico/farmácia) na conversa original
function sendMessageToEntity(name, message) {
    const chatBody = document.getElementById('chat-body');

    if (message.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.innerText = `Você: ${message}`;
    chatBody.appendChild(userMessageElement);

    // Resposta fictícia
    setTimeout(() => {
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message', 'bot-message');
        botMessageElement.innerText = `<Mensagem enviada>`;
        chatBody.appendChild(botMessageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);

    chatBody.scrollTop = chatBody.scrollHeight;
}

// Função para abrir a conversa privada ao clicar no botão de falar com o médico/farmácia
function speakWithPharmacy(name) {
    openPrivateChat(name);
}

// Função para abrir a conversa privada ao clicar no botão de falar com o médico/farmácia
function speakWithUser(name) {
    openPrivateChat(name);
}
