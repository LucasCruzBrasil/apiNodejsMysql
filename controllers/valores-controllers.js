const { response, query } = require('express');
const mysql = require('../mysql');

//create
exports.postInsereValores = async (req, res, next) => {
    try {
        const query = "INSERT INTO valores (valor_cartao, valor_dinheiro, valor_pix, valor_pic_pay, data_valor, qtd_pessoas ) VALUES (?,?,?,?,?,?)";
        const result = await mysql.execute(query, [
            req.body.valor_cartao,
            req.body.valor_dinheiro,
            req.body.valor_pix,
            req.body.valor_pic_pay,
            req.body.data_valor,
            req.body.qtd_pessoas,

        ]);
        let soma =
            req.body.valor_cartao
            + req.body.valor_dinheiro
            + req.body.valor_pix
            + req.body.valor_pic_pay;

            let divisao = soma / req.body.qtd_pessoas;


        const response = {

            mensagem: "Valor do dia inserido com sucesso",
            id_valor: result.id_valor,
            valor_cartao: req.body.valor_cartao,
            valor_dinheiro: req.body.valor_dinheiro,
            valor_pix: req.body.valor_pix,
            valor_pic_pay: req.body.valor_pic_pay,
            dia: req.body.data_valor,
            quantidade_de_pessoas: req.body.qtd_pessoas,
            valor_Total: soma,
            valor_por_pessoa: divisao,
            
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

//read
exports.getListaUmValor = async (req, res, next) => {
    try {
        const query = "SELECT * FROM valores WHERE id_valor = ?;";
        const result = await mysql.execute(query, [req.params.id_valor]);

        if (result.length == 0) {
            return res.status(404).send({
                message: 'Não foi encontrado valor para este ID'
            })
        }
        const response = {
            valores: {
                id_valor: result[0].id_valor,
                valor_cartao: result[0].valor_cartao,
                valor_dinheiro: result[0].valor_dinheiro,
                valor_pix: result[0].valor_pix,
                valor_pic_pay:result[0].valor_pic_pay,
                data_valor:result[0].data_valor,
                qtd_pessoas:result[0].qtd_pessoas,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um colabooador específico ',
                    url: 'http://localhost:3000/colaborador'
                }
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}