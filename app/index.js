const express = require('express');
const BLockchain = require('../blockchain');
//allow us to run app on port 3001 or specify a different port with $ HTTP_PORT=3002 npm run dev
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log('listening on port ${HTTP_PORT}'));