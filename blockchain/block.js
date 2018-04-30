const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce; //value that is included as the calculation of the hash for the block
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`;
    }

    static genesis() {
        return new this('Genesis time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
            let hash, timestamp;
            const lastHash = lastBlock.hash;
            let { difficulty } = lastBlock;
            let nonce = 0;
            //this is proof-of-work algorithim in action. it takes a substring of the generated hash and
            //it makes sure that it maches a certain number of leading zeroes up to the blockchains difficulty
            do {
                nonce++;
                timestamp = Date.now();
                //lastblock gives access to timestamp and the difficulty of the block that came before it
                //and timestamp helps understand how to adjust that difficulty
                difficulty = Block.adjustDifficulty(lastBlock, timestamp);
                hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
            } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
            //this return ensures blocks are generated with the proper hash value to match our leading zero condition
            //by adding a loop to generate these hash values we're demanding that the node requesting to
            //mine a block is actually spending computational power to find this hash value
            return new this(timestamp, lastHash, hash, data, nonce, difficulty);
        }
        //START HASH FUNCTIONS
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
            const { timestamp, lastHash, data, nonce, difficulty } = block;
            return Block.hash(timestamp, lastHash, data, nonce, difficulty);
        }
        //STOP HASH FUNTIONS
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
            difficulty + 1 : difficulty - 1
        return difficulty;
    }
}

module.exports = Block;