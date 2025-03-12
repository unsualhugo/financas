let saldoTotal = 0;
let totalInvestido = 0;
let totalDividendos = 0;

// Função para salvar dados no localStorage
function salvarDados() {
    const dados = {
        saldoTotal,
        totalInvestido,
        totalDividendos,
        entradas: Array.from(document.querySelectorAll('#tabela tbody tr')).map(linha => ({
            descricao: linha.cells[0].textContent,
            valor: parseFloat(linha.cells[1].textContent.replace('R$ ', '')),
            data: linha.cells[2].textContent,
            tipo: linha.cells[3].textContent
        })),
        investimentos: Array.from(document.querySelectorAll('#tabelaInvestimentos tbody tr')).map(linha => ({
            nome: linha.cells[0].textContent,
            cotas: parseFloat(linha.cells[1].textContent),
            valor: parseFloat(linha.cells[2].textContent.replace('R$ ', '')),
            data: linha.cells[3].textContent,
            tipo: linha.cells[4].textContent
        })),
        dividendos: Array.from(document.querySelectorAll('#tabelaDividendos tbody tr')).map(linha => ({
            nome: linha.cells[0].textContent,
            valor: parseFloat(linha.cells[1].textContent.replace('R$ ', '')),
            data: linha.cells[2].textContent
        }))
    };

    localStorage.setItem('planilhaFinanceira', JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('planilhaFinanceira');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        // Restaurar totais
        saldoTotal = dados.saldoTotal || 0;
        totalInvestido = dados.totalInvestido || 0;
        totalDividendos = dados.totalDividendos || 0;

        document.getElementById('saldoTotal').textContent = `R$ ${saldoTotal.toFixed(2)}`;
        document.getElementById('totalInvestido').textContent = `R$ ${totalInvestido.toFixed(2)}`;
        document.getElementById('totalDividendos').textContent = `R$ ${totalDividendos.toFixed(2)}`;

        // Restaurar entradas financeiras
        dados.entradas.forEach(entrada => {
            const newRow = document.getElementById('tabela').getElementsByTagName('tbody')[0].insertRow();
            newRow.insertCell(0).textContent = entrada.descricao;
            newRow.insertCell(1).textContent = `R$ ${entrada.valor.toFixed(2)}`;
            newRow.insertCell(2).textContent = entrada.data;
            newRow.insertCell(3).textContent = entrada.tipo;
            newRow.insertCell(4).innerHTML = `<button onclick="removerLinha(this, ${entrada.valor}, '${entrada.tipo}')">Remover</button>`;
        });

        // Restaurar investimentos
        dados.investimentos.forEach(investimento => {
            const newRow = document.getElementById('tabelaInvestimentos').getElementsByTagName('tbody')[0].insertRow();
            newRow.insertCell(0).textContent = investimento.nome;
            newRow.insertCell(1).textContent = investimento.cotas;
            newRow.insertCell(2).textContent = `R$ ${investimento.valor.toFixed(2)}`;
            newRow.insertCell(3).textContent = investimento.data;
            newRow.insertCell(4).textContent = investimento.tipo;
            newRow.insertCell(5).innerHTML = `<button onclick="removerLinha(this, ${investimento.valor}, 'investimento')">Remover</button>`;
        });

        // Restaurar dividendos
        dados.dividendos.forEach(dividendo => {
            const newRow = document.getElementById('tabelaDividendos').getElementsByTagName('tbody')[0].insertRow();
            newRow.insertCell(0).textContent = dividendo.nome;
            newRow.insertCell(1).textContent = `R$ ${dividendo.valor.toFixed(2)}`;
            newRow.insertCell(2).textContent = dividendo.data;
            newRow.insertCell(3).innerHTML = `<button onclick="removerLinha(this, ${dividendo.valor}, 'dividendo')">Remover</button>`;
        });
    }
}

// Função para alternar entre abas
function abrirAba(aba) {
    document.querySelectorAll('.aba-conteudo').forEach(function (conteudo) {
        conteudo.classList.remove('active');
    });
    document.getElementById(aba).classList.add('active');

    document.querySelectorAll('.aba-link').forEach(function (link) {
        link.classList.remove('active');
    });
    document.querySelector(`[onclick="abrirAba('${aba}')"]`).classList.add('active');
}

// Função para mostrar o formulário de adição de investimento
function mostrarFormularioInvestimento() {
    const formulario = document.getElementById('formularioInvestimento');
    formulario.style.display = 'block';
}

// Função para ocultar o formulário de adição de investimento
function ocultarFormularioInvestimento() {
    const formulario = document.getElementById('formularioInvestimento');
    formulario.style.display = 'none';
}

// Função para adicionar investimentos
function adicionarInvestimento() {
    const nome = document.getElementById('nomeInvestimento').value;
    const cotas = parseFloat(document.getElementById('cotasInvestimento').value);
    const valor = parseFloat(document.getElementById('valorInvestimento').value);
    const data = document.getElementById('dataInvestimento').value;
    const tipo = document.getElementById('tipoInvestimento').value;

    if (nome && !isNaN(cotas) && !isNaN(valor) && data && tipo) {
        const tabela = document.getElementById('tabelaInvestimentos').getElementsByTagName('tbody')[0];
        const newRow = tabela.insertRow();

        const cellNome = newRow.insertCell(0);
        const cellCotas = newRow.insertCell(1);
        const cellValor = newRow.insertCell(2);
        const cellData = newRow.insertCell(3);
        const cellTipo = newRow.insertCell(4);
        const cellAcoes = newRow.insertCell(5);

        cellNome.textContent = nome;
        cellCotas.textContent = cotas;
        cellValor.textContent = `R$ ${valor.toFixed(2)}`;
        cellData.textContent = data;
        cellTipo.textContent = tipo;
        cellAcoes.innerHTML = `<button onclick="removerLinha(this, ${valor}, 'investimento')">Remover</button>`;

        totalInvestido += valor;
        document.getElementById('totalInvestido').textContent = `R$ ${totalInvestido.toFixed(2)}`;

        // Ocultar o formulário após adicionar
        ocultarFormularioInvestimento();

        // Limpar campos de entrada
        document.getElementById('nomeInvestimento').value = '';
        document.getElementById('cotasInvestimento').value = '';
        document.getElementById('valorInvestimento').value = '';
        document.getElementById('dataInvestimento').value = '';

        salvarDados();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
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
        salvarDados();

        // Limpar campos de entrada
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('dataFinancas').value = '';
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
        salvarDados();

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

    salvarDados();
}

// Carregar dados ao abrir a página
window.onload = carregarDados;