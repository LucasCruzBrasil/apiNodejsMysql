const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('../mysql').pool;

exports.cadastrarUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) { return res.status(500).send({ error: error }) }
  
      conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, result) => {
        if (result.length > 0) { res.status(409).send({ mensagem: 'já existe esse email cadastrado' }) }
  
        else {
          bcrypt.hash(req.body.senha, 10, (erroBcrypt, hash) => {
            if (erroBcrypt) { return res.status(500).send({ error: erroBcrypt }) }
            conn.query('INSERT INTO usuarios(email, senha) VALUES (?,?)',
              [req.body.email, hash],
              (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                response = {
  
                  mensagem: 'usuário criado com sucesso',
                  usuariocriado: {
                    id_usuario: results.insertId,
                    email: req.body.email
                  }
  
                }
                return res.status(201).send(response);
  
              })
          })
  
        }
      })
  
  
    });
  }

  exports.loginUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) { return res.status(500).send({ error: error }) }
      const query = `SELECT * FROM usuarios  WHERE email = ?`;
      conn.query(query, [req.body.email], (error, results, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
  
        if (results.length < 1) {
          return res.status(401).send({ mensagem: 'Email ou Senha não existe' })
  
        }
        bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
          if (error) {
            return res.status(401).send({ mensagem: 'falha na autenticação' })
          }
          if (result) {
            const token = jwt.sign({
              id_usuario: results[0].id_usuario,
              email: results[0].email
            }, 
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }); 
            
            return res.status(200).send({
               mensagem: 'Autenticado com sucesso',
               token: token
              })
          }
          return res.status(401).send({ mensagem: 'Email ou Senha não existe' })
  
        })
      })
    })
  }
  