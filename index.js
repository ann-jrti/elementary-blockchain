const { Block } = require('./block.js');
const { Blockchain } = require('./blockchain.js');
const { whateverCoin } = require('./blockchain');

console.log(JSON.stringify(whateverCoin, null, 4));

console.log('Mining block 1...')
whateverCoin.addBlock(new Block(1, "11/09/2021", { amount : 5, 'size': '22834 bytes' }));
console.log('Mining block 2...')
whateverCoin.addBlock(new Block(2, "12/09/2021", { amount : 21, 'size': '83983 bytes' }));
console.log('Mining block 3...')
whateverCoin.addBlock(new Block(3,"13/09/2021", { amount : 13, 'size': '56690 bytes' }));

console.log(JSON.stringify(whateverCoin, null, 4));