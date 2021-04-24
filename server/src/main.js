const express = require('express');
const dotenv = require('dotenv');
const server = require('./server.js');

const PORT = process.env.PORT || 4040;

require('./services/database.js').startDB();

if (process.env.NODE_ENV === 'test') {
  dotenv.config();
}else{
  // Serves React files if it's in production
  server.use('/static', express.static(__dirname + '/build/static'));
  server.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
  })
}

server.listen(PORT, () => {
  console.log('Started server at', PORT);
});
