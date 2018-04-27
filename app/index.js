const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pserver = require('./p2p-server');
//if multiple instances of the same application on the same machine, they cant share the same port
//user can specify a specific port if something else is already running on that port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
//make new Blockchain instance
const bc = new Blockchain();
const p2pServer = new P2pserver(bc);

app.use(bodyParser.json());
//first endpoint for our API that interacts with this Blockchain instance
//the fist paramater of the get function is the endpoint that we want our api to expose
//express will automatically fill out req and res to interact with the users information that they are sending over
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    //we want to sync the chain at the addition of every new block within this mine function
    //send a synchronization every time a mine occurs
    p2pServer.syncChains(); //this second instance should automatically sync its chain with the longer one of the first instance

    res.redirect('/blocks');
});
//make sure app is listening with HTTP_PORT
//log a message once the server is running
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
//app will load and say its listening on 3001
p2pServer.listen(); //starts websocket server in bc application instance