const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login');
const colaboradorController = require('../controllers/colaborador-controllers');

const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './uploads/');

    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  }
)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } cb(null, false);
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}
);

//insere colaborador
router.post('/', 
//login.obrigatorio, 
upload.single('colaborador_imagem'), 
colaboradorController.postInsereColaborador
);

router.get('/', colaboradorController.getColaborador)//lista colaborador



//Alterar Colaborador
router.patch('/', login.obrigatorio, colaboradorController.getAlteraUmcolaborador );

//lista um colaborador específico
router.get('/:id_colaborador', colaboradorController.getListaUmColaborador);

//deleta um colaborador
router.delete('/', login.obrigatorio, colaboradorController.getDeletaUmcolaborador );

//imagem
router.post('/:id_colaborador/imagem', upload.single('colaborador_imagem'),colaboradorController.postInsereImagem);

router.get('/:id_colaborador/imagens', colaboradorController.getListaImagens);


module.exports = router;
