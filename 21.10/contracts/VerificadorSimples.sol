// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerficadorSimples{
    uint public contador;
    function incrementar (uint valor) public {
        require(valor>0, "Valor deve ser maior que zero.");
        contador += valor;
    }
    function decrementar (uint valor) public {
        if (valor > contador){
            revert("Valor excede o contador atual.");
        }
        contador -= valor;
    }
    function verificarinvariavel() public view  returns (bool) {
        assert(contador >= 0);
        return true;
    }
}