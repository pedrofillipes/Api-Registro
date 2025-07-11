// Seleção de elementos
const btnConsultar = document.getElementById("btn-consultar");
const btnNovaEntrada = document.getElementById("btn-nova-entrada");
const consultarSection = document.getElementById("consultar-section");
const novaEntradaSection = document.getElementById("nova-entrada-section");
const btnsVoltar = document.querySelectorAll(".btn-voltar");
const filtroSelect = document.getElementById("filtro");
const filtrosDinamicos = document.getElementById("filtros-dinamicos");

// === CONFIGURE SEUS LINKS AQUI ===
const googleFormsURL = "https://forms.gle/5B5uUash3BURqLym7";
const googleSheetsURL = "https://docs.google.com/spreadsheets/d/1QZAYAFAtf-Z5E5_AWcEpNC5WADtUpONR2j3QGTtH1C4/edit?usp=sharing";

// === BOTÃO NOVA ENTRADA ===
btnNovaEntrada.addEventListener("click", () => {
  window.open(googleFormsURL, "_blank");
});

// === BOTÃO CONSULTAR ===
btnConsultar.addEventListener("click", () => {
  window.open(googleSheetsURL, "_blank");
});

// === Voltar (se você quiser esconder as seções locais) ===
btnsVoltar.forEach(btn => {
  btn.addEventListener("click", () => {
    consultarSection.classList.add("hidden");
    novaEntradaSection.classList.add("hidden");
  });
});

// === Campos dinâmicos do filtro local (opcional, pode manter) ===
filtroSelect.addEventListener("change", () => {
  filtrosDinamicos.innerHTML = ""; // Limpar

  if (filtroSelect.value === "nome") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Digite o nome";
    input.style.textTransform = "uppercase";
    filtrosDinamicos.appendChild(input);
  }

  if (filtroSelect.value === "placa") {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 7;
    input.placeholder = "Digite a placa";
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

    const inputCodigo = document.createElement("input");
    inputCodigo.type = "text";
    inputCodigo.maxLength = 4;
    inputCodigo.placeholder = "Código (4 caracteres)";

    filtrosDinamicos.appendChild(selectUnidade);
    filtrosDinamicos.appendChild(inputCodigo);
  }
});
