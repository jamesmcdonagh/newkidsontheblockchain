const express = require('express');
<<<<<<< HEAD
const BLockchain = require('../blockchain');
//allow us to run app on port 3001 or specify a different port with $ HTTP_PORT=3002 npm run dev
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

=======
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
//if multiple instances of the same application on the same machine, they cant share the same port
//user can specify a specific port if something else is already running on that port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
//make new Blockchain instance
const bc = new Blockchain();

app.use(bodyParser.json());
//first endpoint for our API that interacts with this Blockchain instance
//the fist paramater of the get function is the endpoint that we want our api to expose
//express will automatically fill out req and res to interact with the users information that they are sending over
>>>>>>> d7392abfc22838ad222ff53bcefe436520318b95
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

<<<<<<< HEAD
app.listen(HTTP_PORT, () => console.log('listening on port ${HTTP_PORT}'));
=======
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});
//make sure app is listening with HTTP_PORT
//log a message once the server is running
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
//app will load and say its listening on 3001
>>>>>>> d7392abfc22838ad222ff53bcefe436520318b95
