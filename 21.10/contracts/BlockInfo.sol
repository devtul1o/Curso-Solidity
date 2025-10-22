// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
    contract BlockInfo {
        function getBlockDetails() public view returns (
            uint blockNumber,
            uint timestamp,
            uint difficulty,
            uint gasLimit,
            address coinbase,
            bytes32 blockHash
        ) {
            blockNumber = block.number;
            timestamp = block.timestamp;
            difficulty = block.prevrandao;
            gasLimit = block.gaslimit;
            coinbase = block.coinbase;
            blockHash = blockhash(block.number- 1); 
                    // Only works for last 256 blocks
        }
}