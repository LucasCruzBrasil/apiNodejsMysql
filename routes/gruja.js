const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const grujaControllers = require('../controllers/gruja-controllers');


router.post('/', grujaControllers.postGruja); // insere uma gorjeta
router.get('/', grujaControllers.getGruja); //lista gorjetas
router.get('/:nome', grujaControllers.getNomeGruja); //lista gorjetas por nome

router.get('/:id_gruja', grujaControllers.getUmaGrujaEspecifica);//lista por id específico
router.get('/v/:nome', grujaControllers.getValorByName)//lista total valor de uma pessoa
router.patch('/', grujaControllers.getAtualizaUmaGorjeta); //altera gorjeta 
router.delete('/:id_gruja', grujaControllers.getDeletaUmaGorjeta); //deleta uma gorjeta 





module.exports = router;