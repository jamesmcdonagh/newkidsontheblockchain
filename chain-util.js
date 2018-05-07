const EC = require('elliptic').ec;
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1'); //sec = Standards for Efficient Cryptography prime 256bits k=Koblitz

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidV1();
    }
}

module.exports = ChainUtil;