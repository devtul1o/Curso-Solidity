//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17; 
contract FakeBank2{//um banco que registra os saldos dos
    mapping(address=>uint256) saldos;
    address[] private enderecos;

    constructor(){}
    function getSaldo()public returns (uint){
        enderecos.push(msg.sender);
        saldos[msg.sender]=msg.sender.balance;
        return msg.sender.balance;
    }
    function listSaldos()public view returns (address[] memory,uint256[] memory){
        uint256[] memory saldosList = new uint256[](enderecos.length);
        for(uint256 k=0;k<enderecos.length;k++){
            saldosList[k]=saldos[enderecos[k]];
        }
        return (enderecos,saldosList);
    }
}