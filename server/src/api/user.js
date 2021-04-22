const express = require('express');

const router = express.Router();
const user = require('../services/user.js');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/search/:page', user.listUsers);
router.get('/:id', user.getUser);
router.put('/:id', user.modifyUser);
router.post('/new', user.createUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
