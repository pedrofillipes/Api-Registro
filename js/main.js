// Seleção de elementos
const btnConsultar = document.getElementById("btn-consultar");
const btnNovaEntrada = document.getElementById("btn-nova-entrada");
const consultarSection = document.getElementById("consultar-section");
const novaEntradaSection = document.getElementById("nova-entrada-section");
const btnsVoltar = document.querySelectorAll(".btn-voltar");
const filtroSelect = document.getElementById("filtro");
const filtrosDinamicos = document.getElementById("filtros-dinamicos");

// Mostrar Consultar
btnConsultar.addEventListener("click", () => {
  consultarSection.classList.remove("hidden");
  novaEntradaSection.classList.add("hidden");
});

// Mostrar Nova Entrada
btnNovaEntrada.addEventListener("click", () => {
  novaEntradaSection.classList.remove("hidden");
  consultarSection.classList.add("hidden");
});

// Voltar
btnsVoltar.forEach(btn => {
  btn.addEventListener("click", () => {
    consultarSection.classList.add("hidden");
    novaEntradaSection.classList.add("hidden");
  });
});

// Campos dinâmicos no filtro
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

const novaEntradaForm = document.getElementById("nova-entrada-form");

novaEntradaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(novaEntradaForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value.toUpperCase();
  });

  const params = new URLSearchParams(data).toString();

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxirfwNbN0ZSIO2jxzT5RdgM2sOFDg7mmjA8dcZIWAuM75tDgG1jPJZ5lHpQW-JEA/exec" + "?" + params);
    const result = await response.json();
    if (result.status === "success") {
      alert("Dados salvos com sucesso!");
      novaEntradaForm.reset();
    } else {
      alert("Erro ao salvar: " + JSON.stringify(result));
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar dados: " + error);
  }
});
