const Blockchain = require('./blockchain');

const bc = new Blockchain();
//this will run a loop that runs 10 times to add 10 blocks to the chain
for (let i = 0; i < 10; i++) {
    console.log(bc.addBlock(`Block ${i}`).toString());
}
//total length should be about 30 seconds since difficulty is set to 3000ms and i < 10