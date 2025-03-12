let saldoTotal = 0;
let totalInvestido = 0;
let totalDividendos = 0;

// Função para alternar entre abas
function abrirAba(aba) {
    // Esconde todas as abas
    document.querySelectorAll('.aba-conteudo').forEach(function (conteudo) {
        conteudo.classList.remove('active');
    });

    // Mostra a aba selecionada
    document.getElementById(aba).classList.add('active');

    // Atualiza o estado dos botões
    document.querySelectorAll('.aba-link').forEach(function (link) {
        link.classList.remove('active');
    });
    document.querySelector(`[onclick="abrirAba('${aba}')"]`).classList.add('active');
}

// Função para adicionar entradas financeiras
function adicionarEntrada() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('dataFinancas').value;
    const tipo = document.getElementById('tipo').value;

    if (descricao && !isNaN(valor) && data) {
        const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
        const newRow = tabela.insertRow();

        const cellDescricao = newRow.insertCell(0);
        const cellValor = newRow.insertCell(1);
        const cellData = newRow.insertCell(2);
        const cellTipo = newRow.insertCell(3);
        const cellAcoes = newRow.insertCell(4);

        cellDescricao.textContent = descricao;
        cellValor.textContent = `R$ ${valor.toFixed(2)}`;
        cellData.textContent = data;
        cellTipo.textContent = tipo === 'receita' ? 'Receita' : 'Despesa';
        cellAcoes.innerHTML = `<button onclick="removerLinha(this, ${valor}, '${tipo}')">Remover</button>`;

        if (tipo === 'receita') {
            saldoTotal += valor;
        } else {
            saldoTotal -= valor;
        }

        document.getElementById('saldoTotal').textContent = `R$ ${saldoTotal.toFixed(2)}`;

        // Limpar campos de entrada
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('dataFinancas').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Função para adicionar investimentos
function adicionarInvestimento() {
    const nome = document.getElementById('nomeInvestimento').value;
    const valor = parseFloat(document.getElementById('valorInvestimento').value);
    const data = document.getElementById('dataInvestimento').value;
    const tipo = document.getElementById('tipoInvestimento').value;

    if (nome && !isNaN(valor) && data) {
        const tabela = document.getElementById('tabelaInvestimentos').getElementsByTagName('tbody')[0];
        const newRow = tabela.insertRow();

        const cellNome = newRow.insertCell(0);
        const cellValor = newRow.insertCell(1);
        const cellData = newRow.insertCell(2);
        const cellTipo = newRow.insertCell(3);
        const cellAcoes = newRow.insertCell(4);

        cellNome.textContent = nome;
        cellValor.textContent = `R$ ${valor.toFixed(2)}`;
        cellData.textContent = data;
        cellTipo.textContent = tipo;
        cellAcoes.innerHTML = `<button onclick="removerLinha(this, ${valor}, 'investimento')">Remover</button>`;

        totalInvestido += valor;
        document.getElementById('totalInvestido').textContent = `R$ ${totalInvestido.toFixed(2)}`;

        // Limpar campos de entrada
        document.getElementById('nomeInvestimento').value = '';
        document.getElementById('valorInvestimento').value = '';
        document.getElementById('dataInvestimento').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Função para adicionar dividendos
function adicionarDividendo() {
    const nome = document.getElementById('nomeDividendo').value;
    const valor = parseFloat(document.getElementById('valorDividendo').value);
    const data = document.getElementById('dataDividendo').value;

    if (nome && !isNaN(valor) && data) {
        const tabela = document.getElementById('tabelaDividendos').getElementsByTagName('tbody')[0];
        const newRow = tabela.insertRow();

        const cellNome = newRow.insertCell(0);
        const cellValor = newRow.insertCell(1);
        const cellData = newRow.insertCell(2);
        const cellAcoes = newRow.insertCell(3);

        cellNome.textContent = nome;
        cellValor.textContent = `R$ ${valor.toFixed(2)}`;
        cellData.textContent = data;
        cellAcoes.innerHTML = `<button onclick="removerLinha(this, ${valor}, 'dividendo')">Remover</button>`;

        totalDividendos += valor;
        document.getElementById('totalDividendos').textContent = `R$ ${totalDividendos.toFixed(2)}`;

        // Limpar campos de entrada
        document.getElementById('nomeDividendo').value = '';
        document.getElementById('valorDividendo').value = '';
        document.getElementById('dataDividendo').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Função para remover linhas
function removerLinha(botao, valor, tipo) {
    const linha = botao.closest('tr');
    linha.remove();

    // Atualizar totais
    if (tipo === 'receita') {
        saldoTotal -= valor;
        document.getElementById('saldoTotal').textContent = `R$ ${saldoTotal.toFixed(2)}`;
    } else if (tipo === 'despesa') {
        saldoTotal += valor;
        document.getElementById('saldoTotal').textContent = `R$ ${saldoTotal.toFixed(2)}`;
    } else if (tipo === 'investimento') {
        totalInvestido -= valor;
        document.getElementById('totalInvestido').textContent = `R$ ${totalInvestido.toFixed(2)}`;
    } else if (tipo === 'dividendo') {
        totalDividendos -= valor;
        document.getElementById('totalDividendos').textContent = `R$ ${totalDividendos.toFixed(2)}`;
    }
}