const { response, query } = require('express');
const mysql = require('../mysql');

exports.postInsereValores = async (req,res, next) => {
    try {
        const query = "INSERT INTO valores (valor_cartao, valor_dinheiro, valor_pix, valor_pic_pay, data_valor, qtd_pessoas ) VALUES (?,?,?,?,?,?)";
        const result = mysql.execute(query, [
            req.body.valor_cartao,
            req.body.valor_dinheiro,
            req.body.valor_pix,
            req.body.valor_pic_pay,
            req.body.data_valor,
            req.body.qtd_pessoas
        ]);

        const response = {
            mensagem: "Valor do dia inserido com sucesso",
            id_valor: result.id_valor,
            valor_cartao: req.body.valor_cartao,
            valor_dinheiro: req.body.valor_dinheiro,
            valor_pix: req.body.valor_pix,
            valor_pic_pay:req.body.valor_pic_pay,
            dia:req.body.data_valor,
            quantidade_de_pessoas:req.body.qtd_pessoas,
            request: {
                tipo: 'POST',
                descricao: "Valor do dia",
                url: 'http://localhost:3000/valores'
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log("response");
        return res.status(500).send({ error: error })
    }
}
