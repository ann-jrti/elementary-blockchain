const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, creationDate, anyData, previousHash = '') {
        this.index = index;
        this.creationDate = creationDate;
        this.anyData = anyData;
        this.previousHash = previousHash;
        this.hash = this.hashCalculator();
        this.nonce = 0;
    }

    hashCalculator() {
        return sha256(this.index + this.creationDate + JSON.stringify(this.anyData) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.hashCalculator();
        }
        console.log(`Block successfuly mined! ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, "03/07/1994", "genesis block", "-");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

     addBlock(newBlock) {
         newBlock.previousHash = this.getLastBlock().hash;
         newBlock.mineBlock(this.difficulty);
         newBlock.hash = newBlock.hashCalculator();
         this.chain.push(newBlock);

     }

     validChainOrNot () {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.hash !== currentBlock.hashCalculator()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;       
        }
        return true;
     }
}

let whateverCoin = new Blockchain();

console.log('Mining block 1...')
whateverCoin.addBlock(new Block(1, "11/09/2021", { amount : 5, 'mined by': 'elon' }));
console.log('Mining block 2...')
whateverCoin.addBlock(new Block(2, "12/09/2021", { amount : 21, 'mined by': 'skrt' }));
console.log('Mining block 3...')
whateverCoin.addBlock(new Block(3, "13/09/2021", { amount : 13, 'mined by': 'kitty' }));
