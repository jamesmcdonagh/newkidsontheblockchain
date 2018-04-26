const express = require('express');
const Blockchain = require('../blockchain');
//if multiple instances of the same application on the same machine, they cant share the same port
//user can specify a specific port if something else is already running on that port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
//make new Blockchain instance
const bc = new Blockchain();
//first endpoint for our API that interacts with this Blockchain instance
//the fist paramater of the get function is the endpoint that we want our api to expose
//express will automatically fill out req and res to interact with the users information that they are sending over
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});
//make sure app is listening with HTTP_PORT
//log a message once the server is running
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
//app will load and say its listening on 3001