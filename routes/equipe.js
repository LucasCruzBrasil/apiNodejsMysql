const express = require('express');
const router = express.Router();
const equipeControllers = require('../controllers/equipe-controllers');

router.get('/', equipeControllers.getEquipe); //lista equipes




module.exports = router;