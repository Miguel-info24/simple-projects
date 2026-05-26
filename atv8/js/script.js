setInterval(() => {
    const now = new Date();
    document.getElementById("hora").innerText = now.toLocaleTimeString('pt-BR');
    document.getElementById("data").innerText = now.toLocaleDateString('pt-BR');
}, 1000);

let dados = {
    Covid: {
        Australia: 0,
        Brazil: 0,
        China: 0,
        'United States': 0,
        Russia: 0
    },
    Mpox: {
        Australia: 0,
        Brazil: 0,
        China: 0,
        'United States': 0,
        Russia: 0
    },
    Ebola: {
        Australia: 0,
        Brazil: 0,
        China: 0,
        'United States': 0,
        Russia: 0
    }
};
google.charts.load('current', { packages: ['bar', 'geochart', 'corechart'] });
carregarDados();
google.charts.setOnLoadCallback(drawAll);

function drawAll() {
    drawBar();
    drawMaps();
    drawPie();
}

function drawBar() {
    let tabela = [['Country', 'Covid', 'Mpox', 'Ebola']];

    Object.keys(dados.Covid).forEach(pais => {
        tabela.push([
            pais,
            dados.Covid[pais] || 0,
            dados.Mpox[pais] || 0,
            dados.Ebola[pais] || 0
        ]);
    });

    let data = google.visualization.arrayToDataTable(tabela);

    let chart = new google.charts.Bar(document.getElementById('barchart_material'));
    chart.draw(data, { bars: 'horizontal', colors: ['green', 'red', 'purple'] });
}

function drawMaps() {
    drawMap('Covid', 'mapCovid');
    drawMap('Mpox', 'mapMpox');
}

function drawMap(tipo, id) {
    let tabela = [['Country', 'Casos']];

    Object.entries(dados[tipo]).forEach(([pais, valor]) => {
        tabela.push([pais, valor]);
    });

    let data = google.visualization.arrayToDataTable(tabela);

    let chart = new google.visualization.GeoChart(document.getElementById(id));
    chart.draw(data);
}

function drawPie() {
    let tabela = [['País','Casos']];
    Object.entries(dados.Ebola).forEach(e => tabela.push(e));

    let data = google.visualization.arrayToDataTable(tabela);

    let chart = new google.visualization.PieChart(document.getElementById('pieEbola'));

    chart.draw(data, {
        is3D: true
    });
}
function addCaso(tipo) {
    let select = document.getElementById("select" + tipo);

    if (!dados[tipo]) return;

    let pais = select.value;

    if (!dados[tipo][pais]) {
        dados[tipo][pais] = 0;
    }

    dados[tipo][pais]++;

    salvarDados();
    drawAll();
}
function salvarDados() {
    localStorage.setItem("dadosDoencas", JSON.stringify(dados));
}

function carregarDados() {
    const salvo = localStorage.getItem("dadosDoencas");

    if (salvo) {
        try {
            dados = JSON.parse(salvo);
        } catch {
            console.warn("Erro ao carregar dados");
        }
    }
}



