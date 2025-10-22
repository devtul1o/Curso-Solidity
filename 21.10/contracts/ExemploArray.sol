// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ExemploArrays {
    //exemplo com arrays de strings
    string[] public nomes = ["Joao", "Maria", "Pedro"]; //por valores
    string[] public tnomes; //por tamanho, via construtor
    string[] public vnomes = new string[](20); //array de 20 posicoes
    string[] public dinamico; //dinamico, tipo pilha

    constructor() {
        tnomes = new string[](10); //tamanho inicializado no construtor
    }

    function armazenar(string memory val) public returns (string[] memory) {
        dinamico.push(val); //empilha, colocando por último
        return dinamico;
    }
    function remover() public returns (string[] memory) {
        dinamico.pop(); //remove da pilha o último elemento
        return dinamico;
    }
}