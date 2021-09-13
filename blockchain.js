const sha256 = require('crypto-js/sha256');

function Block (index, creationDate, anyData, previousHash = '') {
    this.index = index;
    this.creationDate = creationDate;
    this.anyData = anyData;
    this.previousHash = previousHash;
    this.hash = this.hashCalculator();
    this.nonce = 0;
}

Block.prototype.hashCalculator = function () {
    return sha256(this.index + this.creationDate + JSON.stringify(this.anyData) + this.previousHash + this.nonce).toString();
}

Block.prototype.mineBlock = function (difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.hashCalculator();
    }
    console.log(`Block successfuly mined! ${this.hash}`);
}

function Blockchain() {
    this.chain = [this.createGenesisBlock()]; //array of blocks
    this.difficulty = 4;
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

console.log('Mining block 1...')
whateverCoin.addBlock(new Block(1, "11/09/2021", { amount : 5, 'size': '22834 bytes' }));
console.log('Mining block 2...')
whateverCoin.addBlock(new Block(2, "12/09/2021", { amount : 21, 'size': '83983 bytes' }));
console.log('Mining block 3...')
whateverCoin.addBlock(new Block(3, "13/09/2021", { amount : 13, 'size': '56690 bytes' }));


console.log(JSON.stringify(whateverCoin, null, 4))

console.log(`blockchain validation: ${whateverCoin.validChainOrNot()}`);

whateverCoin.chain[1].anyData = { amount : 100};
whateverCoin.chain[1].hash = whateverCoin.chain[1].hashCalculator();

console.log(`blockchain validation: ${whateverCoin.validChainOrNot()}`);
