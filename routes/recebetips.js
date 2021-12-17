const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//lista tudo
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      "SELECT * FROM recebetips",
      (error, result, fields) => {
        if (error) { return res.status(500).send({ error: error }) }
        // formando um objeto mais detalhado
        const response = {
          quantidade: result.length,
          produtos: result.map(prod => {
            return {
              idrecebetips: prod.idrecebetips,
              nome: prod.nome,
              preco: prod.preco,
              
              request: {
                tipo: 'GET',
                descricao: '',
                url: 'http://localhost:3000/produtos/' + prod.idrecebetips
              }
            }
          })
        }
        return res.status(200).send(response)
      }
    )
  })
})







//insere dentro de produtos
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
      if (error) { return res.status(500).send({ error: error }) }
      conn.query(
        "INSERT INTO recebetips (idrecebetips, preco)VALUES(?,?)",
        [req.body.idrecebetips, req.body.preco],
        (error, result, field) => {
          conn.release();
          if (error) {
            return res.status(500).send({
              mensagem: error,
              response: null
            })
          }
          const response = {
            mensagem: "Produto inserido com sucesso",
            idProdutoCriado: result.idrecebetips,
            //nome: req.body.nome,
            preco: req.body.preco,
            request: {
              tipo: 'GET',
              descricao: 'Insere um produto',
              url: 'http://localhost:3000/recebetips'
            }
          }
          return res.status(201).send(response);
        }
      )
    })
  
  
  });
  
  module.exports = router;