const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const valoresControllers = require('../controllers/valores-controllers');

router.post('/', valoresControllers.postInsereValores); // insere uma gorjeta

module.exports = router;