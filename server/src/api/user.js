const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const user = require('../services/user.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/list/:page', user.listUsers);
router.get('/:id', user.getUser);
router.put('/:id', user.modifyUser);
router.post('/new', user.createUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
