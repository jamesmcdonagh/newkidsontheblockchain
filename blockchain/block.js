const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 4;

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
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
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