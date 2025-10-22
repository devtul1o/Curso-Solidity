// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CadastroUsuarios {
    
    struct Cadastro{
    address endereco;
    string nome;
    }
    Cadastro[] private usuarios;

    constructor(){
        usuarios.push(Cadastro({endereco: msg.sender, nome:"Owner"}));
    }
    function cadastrarUsuario(string memory _nome) public{
        Cadastro memory cad=Cadastro(msg.sender, _nome);
        usuarios.push(cad);
    }
    function listarUsuarios()public view returns(Cadastro[]memory){
        return usuarios;
    }
    function removerUsuario(uint256 _id) public{
        delete usuarios[_id];
    }
}