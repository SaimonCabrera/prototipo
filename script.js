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
            botMessageElement.innerText = `Bem-vindo ao bot, ${contactName}! Como posso ajudar? Escolha uma das opções abaixo:`;
            chatBody.appendChild(botMessageElement);

            // Adicionar botões
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('bot-buttons');

            const button1 = document.createElement('button');
            button1.classList.add('bot-button');
            button1.innerText = 'Médicos';
            button1.onclick = () => handleBotOption('Médicos');

            const button2 = document.createElement('button');
            button2.classList.add('bot-button');
            button2.innerText = 'Farmácias';
            button2.onclick = () => handleBotOption('Farmácias');

            buttonContainer.appendChild(button1);
            buttonContainer.appendChild(button2);
            chatBody.appendChild(buttonContainer);

            chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
        }, 1000);

        firstMessage = false;
    }

    // Scroll para a última mensagem
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Função para lidar com as opções selecionadas
function handleBotOption(option) {
    const chatBody = document.getElementById('chat-body');

    // Mostrar a escolha do usuário
    const userChoiceElement = document.createElement('div');
    userChoiceElement.classList.add('message', 'user-message');
    userChoiceElement.innerText = `Você escolheu: ${option}`;
    chatBody.appendChild(userChoiceElement);

    // Responder de acordo com a opção
    if (option === 'Médicos') {
        setTimeout(() => {
            const botResponseElement = document.createElement('div');
            botResponseElement.classList.add('message', 'bot-message');
            botResponseElement.innerText = 'Escolha uma das áreas médicas abaixo:';
            chatBody.appendChild(botResponseElement);

            // Adicionar mais 4 sub-opções (áreas médicas), dois por linha
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
    userChoiceElement.innerText = `Você escolheu: ${areaMedica}`;
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
        ]
    };

    // Adicionar informações dos médicos
    const medicosArea = medicos[areaMedica] || [];
    setTimeout(() => {
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

        // Botão para voltar ao início
        const voltarBotao = document.createElement('button');
        voltarBotao.innerText = 'Voltar ao Início';
        voltarBotao.onclick = backToBot;
        chatBody.appendChild(voltarBotao);
        

        chatBody.scrollTop = chatBody.scrollHeight; // Scroll para a última mensagem
    }, 1000);
}


// Função para criar a nova tela de conversa com o médico ou farmácia
function openPrivateChat(entityName) {
    // Ocultar a tela do bot e mostrar a nova tela de conversa
    document.getElementById('chat-screen').style.display = 'none';
    document.getElementById('private-chat-screen').style.display = 'flex';

    // Definir o nome da entidade na nova tela de conversa
    document.getElementById('private-contact-name').innerText = `Conversando com ${entityName}`;

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
