const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); //sec = Standards for Efficient Cryptography prime 256bits k=Koblitz

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
}

module.exports = ChainUtil;