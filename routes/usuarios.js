const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioControllers = require('../controllers/usuario-controllers');

router.post('/cadastro',usuarioControllers.cadastrarUsuario );

router.post('/login', usuarioControllers.loginUsuario);

module.exports = router;