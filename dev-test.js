const Blockchain = require('./blockchain');

const bc = new Blockchain();
//this will run a loop that runs 10 times to add 10 blocks to the chain
for (let i = 0; i < 20; i++) {
    console.log(bc.addBlock(`Block ${i}`).toString());
}