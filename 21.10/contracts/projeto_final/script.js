const abi = [/* Cole aqui sua ABI */];
const enderecoContrato = "COLE_AQUI_O_ENDERECO_DO_CONTRATO";

let web3;
let contrato;

async function conectar() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    contrato = new web3.eth.Contract(abi, enderecoContrato);
  } else {
    mostrarNotificacao("erro", "MetaMask não detectado.");
  }
}

async function registrarBateria() {
  await conectar();
  const tipo = document.getElementById("tipo").value;
  const uso = document.getElementById("uso").value;
  const numeroSerie = document.getElementById("numeroSerie").value;
  const dataProducao = document.getElementById("dataProducao").value;
  const lote = document.getElementById("lote").value;

  const contas = await web3.eth.getAccounts();
  try {
    await contrato.methods.registrarBateria(tipo, uso, numeroSerie, dataProducao, lote)
      .send({ from: contas[0] });
    mostrarNotificacao("sucesso", "Bateria registrada com sucesso!");
  } catch (err) {
    console.error(err);
    mostrarNotificacao("erro", "Erro ao registrar bateria.");
  }
}

async function listarBaterias() {
  await conectar();
  const baterias = await contrato.methods.listar().call();
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  baterias.forEach((bateria, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${index}</td>
      <td>${bateria.numeroSerie}</td>
      <td>${bateria.tipo}</td>
      <td>${bateria.uso}</td>
      <td>${bateria.lote}</td>
      <td>${bateria.dataProducao}</td>
      <td>${new Date().toLocaleDateString("pt-BR")}</td>
    `;
    lista.appendChild(linha);
  });
}

async function atualizarTotal() {
  await conectar();
  const baterias = await contrato.methods.listar().call();
  document.getElementById("totalBaterias").value = baterias.length;
}

async function consultarPorId() {
  await conectar();
  const id = document.getElementById("consultaId").value;
  try {
    const b = await contrato.methods.getBateria(id).call();
    mostrarNotificacao("sucesso", `ID ${id}: ${b.numeroSerie}, ${b.tipo}, ${b.uso}`);
  } catch {
    mostrarNotificacao("erro", "ID inválido ou não encontrado.");
  }
}

async function removerPorSerial() {
  await conectar();
  const serial = document.getElementById("serialRemover").value;
  const baterias = await contrato.methods.listar().call();
  const contas = await web3.eth.getAccounts();

  let removido = false;
  for (let i = 0; i < baterias.length; i++) {
    if (baterias[i].numeroSerie === serial) {
      await contrato.methods.removerBateria(i).send({ from: contas[0] });
      removido = true;
      break;
    }
  }

  if (removido) {
    mostrarNotificacao("sucesso", `Bateria com serial ${serial} removida.`);
    listarBaterias();
  } else {
    mostrarNotificacao("erro", "Serial não encontrado.");
  }
}

function mostrarSecao(id) {
  document.querySelectorAll(".content-section").forEach(secao => {
    secao.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });
  document.querySelector(`.nav-link[onclick="mostrarSecao('${id}')"]`).classList.add("active");
}

function mostrarNotificacao(tipo, mensagem) {
  const notificacao = document.getElementById("notificacao");
  notificacao.className = `notificacao show ${tipo}`;
  notificacao.textContent = mensagem;
  setTimeout(() => {
    notificacao.className = "notificacao";
  }, 4000);
}