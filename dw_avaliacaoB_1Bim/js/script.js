const inputData = document.getElementById("date");
const erro = document.getElementById("erro");
const form = document.getElementById("form-atividade");
const inputNome = document.getElementById("atividade");
const inputTipo = document.querySelector("select[name='classificacao']");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroPendentes = document.getElementById("filtro-pendentes");
const filtroFinalizadas = document.getElementById("filtro-finalizadas");

let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

const hoje = new Date();
const hojeFormatado = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
inputData.min = hojeFormatado;

inputData.addEventListener("input", () => {
    const dataSelecionada = new Date(inputData.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
        erro.textContent = "A data deve ser a partir de hoje.";
        inputData.value = "";
    } else {
        erro.textContent = "";
    }
});

filtroTipo.addEventListener("change", renderizarAtividades);
filtroPendentes.addEventListener("change", renderizarAtividades);
filtroFinalizadas.addEventListener("change", renderizarAtividades);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const tipo = inputTipo.value;
    const data = inputData.value;

    if (!nome || !tipo || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    const dataSelecionada = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
        alert("A data deve ser a partir de hoje.");
        return;
    }

    const atividade = {
        nome,
        tipo,
        data,
        status: "pendente"
    };

    atividades.push(atividade);
    localStorage.setItem("atividades", JSON.stringify(atividades));

    form.reset();
    atualizarTudo();
});

function atualizarTudo() {
    atividades = JSON.parse(localStorage.getItem("atividades")) || [];
    atualizarGrafico();
    atualizarStatus();
    renderizarAtividades();
}

function atualizarStatus() {
    const { pendentes, finalizadas, total } = atividades.reduce((acc, a) => {
        const status = a.status?.toLowerCase().trim();

        if (status === "pendente") acc.pendentes++;
        if (status === "finalizada") acc.finalizadas++;

        acc.total++;
        return acc;
    }, { pendentes: 0, finalizadas: 0, total: 0 });

    document.getElementById("qtd-pendentes").textContent = pendentes;
    document.getElementById("qtd-finalizadas").textContent = finalizadas;
    document.getElementById("qtd-total").textContent = total;
}

function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function renderizarAtividades() {
    const container = document.getElementById("lista-atividades");

    const tipoSelecionado = filtroTipo.value;
    const mostrarPendentes = filtroPendentes.checked;
    const mostrarFinalizadas = filtroFinalizadas.checked;

    const atividadesFiltradas = atividades
        .map((a, i) => ({ ...a, indexOriginal: i }))
        .filter(a => {
            const tipoOk = tipoSelecionado === "todos" || a.tipo === tipoSelecionado;

            const statusOk =
                (!mostrarPendentes && !mostrarFinalizadas) ||
                (mostrarPendentes && a.status === "pendente") ||
                (mostrarFinalizadas && a.status === "finalizada");

            return tipoOk && statusOk;
        });

    container.innerHTML = atividadesFiltradas.map(a => `
        <div class="activity-row ${a.status === "finalizada" ? "finalizada" : ""}">
            <span class="col nome">${a.nome}</span>
            <span class="col tipo">${a.tipo}</span>
            <span class="col data">${formatarData(a.data)}</span>
            <span class="col acoes">
                <input type="checkbox"
                    ${a.status === "finalizada" ? "checked" : ""}
                    onchange="finalizarAtividade(${a.indexOriginal})">
                <span class="delete" onclick="excluirAtividade(${a.indexOriginal})"><i class="bi bi-trash"></i></span>
            </span>
        </div>
    `).join("");
}

function finalizarAtividade(index) {
    atividades[index].status = "finalizada";
    localStorage.setItem("atividades", JSON.stringify(atividades));
    atualizarTudo();
}

function excluirAtividade(index) {
    atividades = atividades.filter((_, i) => i !== index);
    localStorage.setItem("atividades", JSON.stringify(atividades));
    atualizarTudo();
}

function atualizarGrafico() {
    const contagem = atividades.reduce((acc, a) => {
        const tipo = a.tipo?.toLowerCase().trim();
        if (acc[tipo] !== undefined) acc[tipo]++;
        return acc;
    }, {
        academia: 0,
        domestica: 0,
        fisica: 0,
        lazer: 0
    });

    const data = google.visualization.arrayToDataTable([
        ["Tipo", "Quantidade", { role: "style" }],
        ["Acadêmia", contagem.academia, "color: darkviolet"],
        ["Doméstica", contagem.domestica, "color: violet"],
        ["Física", contagem.fisica, "color: mediumpurple"],
        ["Lazer", contagem.lazer, "color: blueviolet"]
    ]);

    const view = new google.visualization.DataView(data);
    view.setColumns([
        0,
        1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2
    ]);

    const options = {
        width: 540,
        height: 170,
        bar: { groupWidth: "70%" },
        legend: { position: "none" }
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById("columnchart_values")
    );

    chart.draw(view, options);
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(atualizarTudo);

