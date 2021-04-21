const express = require('express');
const router = express.Router();
const user = require("../services/user.js");

router.get('/:id', user.getUser);
router.put('/:id', user.modifyUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
