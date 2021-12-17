const express = require('express');
const morgan = require('morgan');
const rotaProdutos = require('./routes/produtos')
const rotaTips = require('./routes/tips')
const rotaRecebetips = require('./routes/recebetips')
const rotaColaborador = require('./routes/colaborador')
const rotaGruja = require('./routes/gruja')
const rotaUsuarios = require('./routes/usuarios');
const bodyParser= require('body-parser')

const app = express();
//var express = require('express');
var cors = require('cors');
//var app = express();
app.use(cors());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/produtos', rotaProdutos);
app.use('/tips', rotaTips);
app.use('/recebetips', rotaRecebetips);
app.use('/colaborador', rotaColaborador);
app.use('/gruja', rotaGruja);
app.use('/usuarios' ,rotaUsuarios);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use((req, res, next) =>  {

    const erro = new Error('nao encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.mensagem
        }

    })
})

module.exports = app;