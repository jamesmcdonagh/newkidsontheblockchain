const websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
//will return back an array of website addresses and elements
const peers = preocess.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    //takes 1 piece of data as input which is a block chain object
    //we want to give each P2p server a block so that they can share their individual chain objects with each other
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];//this array of sockets on the class will contain a list of the connected web socket servers that will connect to this one
    }
//listen does the job of starting up the server and creating it
    listen() {
//to create the web socket server we can use a server class that is contained in the websocket module and is shared statically
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket)); //pushes socket to array of sockets
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket connected");
    }
}



//websocket address' that this websocket should connect to as a peer
//ws://localhost:5001,ws://localhost:5002
//this is going to be the entire stream for our peers environment variable 
//HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws:////localhost:5001,ws://localhost:5002 npm run dev
//this is an instance of the application that will actually connect to some peers on our system