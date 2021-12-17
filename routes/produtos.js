const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//lista tudo
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      "SELECT * FROM produtos",
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
      "INSERT INTO produtos (nome, preco)VALUES(?,?)",
      [req.body.nome, req.body.preco],
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
          nome: req.body.nome,
          preco: req.body.preco,
          request: {
            tipo: 'GET',
            descricao: 'Insere um produto',
            url: 'http://localhost:3000/produtos'
          }
        }
        return res.status(201).send(response);
      }
    )
  })


});




//busca pelo id
router.get('/:idrecebetips', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      "SELECT * FROM produtos WHERE idrecebetips = ?;",
      [req.params.idrecebetips],
      (error, result, fields) => {
        if (error) { return res.status(500).send({ error: error }) }
        
        if(result == 0){return res.status(404).send({
          mensagem: 'Não fio encotrado nenhum produto com esse id'
        })}
        
        const response = {
          produto: {
            idProdutoCriado: result[0].idrecebetips,
            nome: result[0].nome,
            preco: result[0].preco,
            request: {
              tipo: 'GET',
              descricao: 'Retorna um produto específico ',
              url: 'http://localhost:3000/produtos'
            }
          }
        }
        return res.status(200).send(response);
      }
    )
  })

});

//altera um produto 
router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      `UPDATE produtos
             SET nome    = ?,
                 preco   = ?
             WHERE idrecebetips= ? `,

      [
        req.body.nome,
        req.body.preco,
        req.body.idrecebetips
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            mensagem: error,
            response: null
          })
        }
        const response = {
          mensagem:"Produto atualizado com sucesso",
          produtoAtualizado: {
             idrecebetips: req.body.idrecebetips,
             nome: req.body.nome,
             preco: req.body.preco,
             request:{
               tipo: 'GET',
               descricao:'Produto atualizado com sucesso' +req.body.idrecebetips,
               url: 'http://localhost:3000/produtos'
             }
          }
        }
        return res.status(202).send(response);
      }
    )
  })

})

//deleta um produto
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      "DELETE FROM produtos WHERE idrecebetips = ?",

      [req.body.idrecebetips],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            mensagem: error,
            response: null
          })
        }
        const response = {
          mensagem: "Pedido deletado com sucesso",
          request: {
            tipo: 'POST',
            descricao:'insere um produto',
            url:'http://localhost:3000/produtos',
            body : {
              nome: 'String',
              preco: 'Number' 
            }
          }
        }
       return res.status(202).send(response);
      }
    )
  })
})
module.exports = router;