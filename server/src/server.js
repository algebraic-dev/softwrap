const express = require('express');
const userRouter = require('./api/user.js');

const app = express();

app.use('/user', userRouter);

module.exports = app;
