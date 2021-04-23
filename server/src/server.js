const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./api/user.js');

const app = express();

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// To avoid errors inside bodyParser
app.use((error, _, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).end();
  } else {
    next();
  }
});

app.use('/user', userRouter);

app.use('*', (_, res) => {
  res.status(404).end();
});

module.exports = app;
