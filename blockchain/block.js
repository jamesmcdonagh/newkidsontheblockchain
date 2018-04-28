const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;//value that is included as the calculation of the hash for the block
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Hash     : ${this.hash.substring(0, 10)}
            Nonce    : ${this.nonce}
            Data     : ${this.data}`;
    }

    static genesis() {
        return new this('Genesis time', '------', 'f1r57-h45h', [], 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
//this is proof-of-work algorithim in action. it takes a substring of the generated hash and
//it makes sure that it maches a certain number of leading zeroes up to the blockchains difficulty
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
//this return ensures blocks are generated with the proper hash value to match our leading zero condition
//by adding a loop to generate these hash values we're demanding that the node requesting to
//mine a block is actually spending computational power to find this hash value
        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}

module.exports = Block;