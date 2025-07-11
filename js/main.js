// === CONFIGURE SEUS LINKS AQUI ===
const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQfYgmPuKdMVYjqBK1ExVkGid51oNezVXsmCMW4y0aDgwLzVC5U0PMFveduspteRUW2LIHloW_ZXdw/pub?gid=2061443977&single=true&output=csv";
const googleFormsURL = "https://forms.gle/N8ZdQ6nTbuwAfBJE7";

// Seletores
const btnConsultar = document.getElementById("btn-consultar");
const btnNovaEntrada = document.getElementById("btn-nova-entrada");
const consultarSection = document.getElementById("consultar-section");
const novaEntradaSection = document.getElementById("nova-entrada-section");
const btnsVoltar = document.querySelectorAll(".btn-voltar");
const filtroSelect = document.getElementById("filtro");
const filtrosDinamicos = document.getElementById("filtros-dinamicos");
const resultadosContainer = document.getElementById("resultados");

// === BOTÃO NOVA ENTRADA ===
btnNovaEntrada.addEventListener("click", () => {
  window.open(googleFormsURL, "_blank");
});

// === BOTÃO CONSULTAR ===
btnConsultar.addEventListener("click", () => {
  consultarSection.classList.remove("hidden");
  novaEntradaSection.classList.add("hidden");
  resultadosContainer.innerHTML = "";
});

// === BOTÕES VOLTAR ===
btnsVoltar.forEach(btn => {
  btn.addEventListener("click", () => {
    consultarSection.classList.add("hidden");
    novaEntradaSection.classList.add("hidden");
  });
});

// === Campos dinâmicos de filtro ===
filtroSelect.addEventListener("change", () => {
  filtrosDinamicos.innerHTML = "";

  if (filtroSelect.value === "nome") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Digite o nome";
    input.id = "campo-filtro";
    input.style.textTransform = "uppercase";
    filtrosDinamicos.appendChild(input);
  }

  if (filtroSelect.value === "placa") {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 7;
    input.placeholder = "Digite a placa";
    input.id = "campo-filtro";
    input.style.textTransform = "uppercase";
    filtrosDinamicos.appendChild(input);
  }

  if (filtroSelect.value === "unidade") {
    const selectUnidade = document.createElement("select");
    ["C", "D", "E"].forEach(u => {
      const opt = document.createElement("option");
      opt.value = u;
      opt.textContent = u;
      selectUnidade.appendChild(opt);
    });
    selectUnidade.id = "campo-filtro-unidade";

    const inputCodigo = document.createElement("input");
    inputCodigo.type = "text";
    inputCodigo.maxLength = 4;
    inputCodigo.placeholder = "Código";
    inputCodigo.id = "campo-filtro-codigo";

    filtrosDinamicos.appendChild(selectUnidade);
    filtrosDinamicos.appendChild(inputCodigo);
  }

  // Botão buscar
  const btnBuscar = document.createElement("button");
  btnBuscar.textContent = "Buscar";
  btnBuscar.type = "button";
  btnBuscar.className = "btn-buscar";
  btnBuscar.addEventListener("click", buscarDados);
  filtrosDinamicos.appendChild(btnBuscar);
});

// === Função buscar dados ===
async function buscarDados() {
  resultadosContainer.innerHTML = "Carregando...";

  try {
    const response = await fetch(csvURL);
    const csvText = await response.text();
    const dados = parseCSV(csvText);

    const tipoFiltro = filtroSelect.value;
    let resultado = [];

    if (tipoFiltro === "nome") {
      const termo = document.getElementById("campo-filtro").value.toUpperCase();
      resultado = dados.filter(l => l["Nome"].toUpperCase().includes(termo));
    }

    if (tipoFiltro === "placa") {
      const termo = document.getElementById("campo-filtro").value.toUpperCase();
      resultado = dados.filter(l => l["Placa"].toUpperCase().includes(termo));
    }

    if (tipoFiltro === "unidade") {
      const unidade = document.getElementById("campo-filtro-unidade").value.toUpperCase();
      const codigo = document.getElementById("campo-filtro-codigo").value.toUpperCase();
      resultado = dados.filter(l =>
        l["Unidade"].toUpperCase() === unidade &&
        l["Unidade"].toUpperCase().endsWith(codigo)
      );
    }

    if (resultado.length === 0) {
      resultadosContainer.innerHTML = "Nenhum registro encontrado.";
    } else {
      resultadosContainer.innerHTML = gerarTabelaHTML(resultado);
    }

  } catch (error) {
    resultadosContainer.innerHTML = "Erro ao carregar dados.";
    console.error(error);
  }
}

// === Conversor CSV em array de objetos ===
function parseCSV(csv) {
  const linhas = csv.trim().split("\n");
  const cabecalho = linhas.shift().split(",");

  return linhas.map(linha => {
    const valores = linha.split(",");
    const obj = {};
    cabecalho.forEach((col, i) => {
      obj[col.trim()] = valores[i]?.trim() || "";
    });
    return obj;
  });
}

// === Gera tabela HTML ===
function gerarTabelaHTML(dados) {
  let html = "<table><thead><tr>";
  Object.keys(dados[0]).forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += "</tr></thead><tbody>";

  dados.forEach(linha => {
    html += "<tr>";
    Object.values(linha).forEach(valor => {
      html += `<td>${valor}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  return html;
}
