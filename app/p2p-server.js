const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
//will return back an array of website addresses and elements
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    //takes 1 piece of data as input which is a block chain object
    //we want to give each P2p server a block so that they can share their individual chain objects with each other
    constructor(blockchain) {
            this.blockchain = blockchain;
            this.sockets = []; //this array of sockets on the class will contain a list of the connected web socket servers that will connect to this one
        }
        //listen does the job of starting up the server and creating it
    listen() {
        //to create the web socket server we can use a server class that is contained in the websocket module and is shared statically
        //this gives the blocking application instance the ability to generate a server for other instances to connect to
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket)); //pushes socket to array of sockets

        this.connectToPeers();


        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach(peer => {
            // ws:localhost:5001 is what it will look like
            const socket = new Websocket(peer); //creates socket object

            socket.on('open', () => this.connectSocket(socket));
        });
    }
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket connected");

        this.messageHandler(socket);

        this.sendChain(socket);
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);

            this.blockchain.replaceChain(data); //represents chain from another peer
        });
    }

    sendChain(socket) {
        //we use the send method of the socket object, the send method allows us to send an event to the relevant socket containting a stringfy message
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() { //the goal of this function will be to send the updated block chain of this current isntance to all of the socket peers
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports = P2pServer;

//websocket address' that this websocket should connect to as a peer
//ws://localhost:5001,ws://localhost:5002, etc
//this is going to be the entire stream for our peers environment variable 
//HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws:////localhost:5001,ws://localhost:5002 npm run dev
//this is an instance of the application that will actually connect to some peers on our system

//make sure that these messages actually update our blockchains and they all agree on one
//because the second instance is sending its small blockchain and the first one but the first instance is sending its large blockchain to the second one

//replace the current chain with the one it recieved
//checks whether or not the incoming chain is longer and if it has valid hashes through another validation
//we may want our chain to sychronize...when a new block is mined and added to the system, 
//we want each of our peers to be aware of the addition and to be up-to-date