class Block {
    constructor(timestamp, lasthash, hash, data) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lasthash.substring(0, 10)}
            Hash     : ${this.hash.substring(0, 10)}
            Data     : ${this.data}`;
    }
}

module.exports = Block;