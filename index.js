// import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// create a new express application that will serve as our server
const app = express();

// parse application/json
app.use(bodyParser.json());

// serve static files
app.use(express.static('public'));

// store messages in an array
const messages = [];

// listen for new messages
app.post('/api/send', (req, res) => {
  const message = req.body.message;
  console.log(message);
  messages.push(message);
});

// send messages to client on request
app.get('/api/messages', (req, res) => {
  res.json({ messages });
});

// start server on port 3000
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
