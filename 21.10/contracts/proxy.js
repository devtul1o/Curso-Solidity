const proxyAddress = "0x81F9FAb9eA82C9Bb8C45b6Be9fCaDBEB669e0a19";

// ABI da implementação — inclui os métodos que você quer usar
const implementationAbi = [
    {
        "inputs": [],
        "name": "numero",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "incrementar",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let contract;

async function conectarContrato() {
    if (typeof window.ethereum === "undefined") {
        alert("Metamask não detectada.");
        return;
    }

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();

        // Verifica se está na rede Arbitrum Sepolia (Chain ID 421614)
        if (network.chainId !== 421614) {
            alert("Conecte-se à rede Arbitrum Sepolia (Chain ID 421614).");
            return;
        }

        const signer = provider.getSigner();

        // Usa o ABI da implementação, mas o endereço do proxy
        contract = new ethers.Contract(proxyAddress, implementationAbi, signer);

        const valor = await contract.numero();
        document.getElementById("numero").textContent = valor.toString();
    } catch (error) {
        console.error("Erro ao conectar ao contrato:", error);
        alert("Falha ao conectar. Verifique sua conexão e rede.");
    }
}

async function incrementar() {
    if (!contract) {
        alert("Contrato não conectado.");
        return;
    }

    try {
        const tx = await contract.incrementar();
        await tx.wait();
        conectarContrato(); // Atualiza o valor após incremento
    } catch (error) {
        console.error("Erro ao incrementar:", error);
        alert("Falha ao executar a transação.");
    }
}

conectarContrato();