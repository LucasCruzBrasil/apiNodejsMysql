const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//lista tip
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get dentro da rot de produtos'
    })
})

// cria uma tip
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "INSERT INTO tips (idtips ,idrecebetips, valortips)VALUES(?,?,?)",
            [req.body.idtips,req.body.idrecebetips, req.body.valortips],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        mensagem: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: "Tiips inserido com sucesso",
                    pedidoCriado: {
                        
                        idtips: req.body.idtips,
                        idProdutoCriado: req.body.idrecebetips,
                        valor: req.body.valortips,
                        request: {
                            tipo: 'GET',
                            descricao: 'Insere uma tip',
                            url: 'http://localhost:3000/recebetips'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })


});


//tip especifica
router.get('/:id_tips', (req, res, next) => {
    const id = req.params.id_produto
    if (id === 'especial') {
        res.status(200).send({
            mesnsagem: 'tipe especifica',
            id_tips: id
        })
    } else {
        res.status(200).send({
            mensagem: 'Você passou um id '
        });
    }


});

//altera uma tip
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'uma tip alterada com sucesso'
    })
})

//deleta uma tip
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'uma tip deletado com sucesso'
    })
})
module.exports = router;