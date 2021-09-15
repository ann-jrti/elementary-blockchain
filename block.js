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
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        this.nonce++;
        this.hash = this.hashCalculator();
    }
    console.log(`Block successfully mined! ${this.hash}`);
}

module.exports.Block = Block;