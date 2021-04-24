const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const server = require('./server.js');

const PORT = process.env.PORT || 4040;

if (process.env.NODE_ENV === 'test') {
  dotenv.config();
} else {
  // Serves React files if it's in production
  server.use('/static', express.static(path.join(__dirname, '/build/static')));
  server.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });
}

require('./services/database.js').startDB();

server.listen(PORT, () => {
  console.log('Started server at', PORT);
});
