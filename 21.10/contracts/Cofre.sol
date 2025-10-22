// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract Cofre {
    address public dono;
    constructor() {
        dono = msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender == dono, "Apenas o dono pode transferir");
        _;
    }
    modifier denyZero(){
        require(msg.value <= address(this).balance, "Saldo insuficiente");
        // Função que permite ao contrato receber Ether explicitamente
        _;
    }
    function depositar() public payable {
    // O valor é automaticamente adicionado
    }
    // Função especial para receber Ether sem dados
    receive() external payable {
    // Nenhuma lógica necessária — o saldo é atualizado automaticamente
    }
    function saldoDoContrato() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    function transferirPara(address payable destinatario, uint256 valor) public payable onlyOwner denyZero{
        // require(msg.sender == dono, "Apenas o dono pode transferir");
        // require(valor <= address(this).balance, "Saldo insuficiente");
        destinatario.transfer(valor);
    }
    function sacar(uint256 valor) public onlyOwner {
    uint256 taxa = 100000000000000; // 0.0001 Ether
    require(valor >= taxa, "Valor menor que a taxa");
    require(valor <= address(this).balance, "Saldo insuficiente");
    payable(dono).transfer(valor - taxa);
    }
}
