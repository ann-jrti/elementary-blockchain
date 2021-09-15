const sha256 = require('crypto-js/sha256');
const { Block } = require('./block.js');

function Blockchain() {
    this.chain = [this.createGenesisBlock()]; 
    this.difficulty = 2;
}

Blockchain.prototype.createGenesisBlock = function() {
    return new Block(0, "03/07/1994", "genesis block", "-");
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.addBlock = function (newBlock) {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.mineBlock(this.difficulty);
    newBlock.hash = newBlock.hashCalculator();
    this.chain.push(newBlock);
}

Blockchain.prototype.validChainOrNot = function() {
    for(let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];
        if (currentBlock.hash !== currentBlock.hashCalculator()) return false;
        if (currentBlock.previousHash !== previousBlock.hash) return false;       
    }
    return true;
}

let whateverCoin = new Blockchain();

module.exports = { Blockchain }
module.exports = { whateverCoin }

