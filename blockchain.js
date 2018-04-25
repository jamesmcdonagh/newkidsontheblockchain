const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);

        return block;
    }
    //in order to support multiple contributers to our blockchain, we need to add a funtion that checks the validity of upcoming chains
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    //if the chain is invalid the function will return false otherwise the chain is ok and the function returns true 
    //Note that two different objects that aren't referencing the same original object cannot be equal to each other even if they have the same exact elements
        
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;