const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const valoresControllers = require('../controllers/valores-controllers');

router.post('/', valoresControllers.postInsereValores); // insere uma gorjeta
router.get('/', valoresControllers.getValores);
router.get('/:id_valor', valoresControllers.getListaUmValor); // lista um valor específico
router.patch('/', valoresControllers.getAtualizaUmValor); // atualiza
module.exports = router;