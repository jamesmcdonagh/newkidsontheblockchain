const Blockchain = require('./blockchain');

const bc = new Blockchain();
//this will run a loop that runs 10 times
for (let i=0; i<10; i++) {
    console.log(bc.addBlock(`foo ${i}`).toString());
}