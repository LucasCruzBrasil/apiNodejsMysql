const e = require('cors');
const mysql = require('../mysql');



//join entre tabela equipe e valores 

exports.getEquipe = async (req, res, next) => {
    try {
        const query = `select valores.id_valor,valores.valor_dinheiro, valores.valor_pix, valores.valor_pic_pay, valores.data_valor, valores.qtd_pessoas, equipe.equipe_nomes, equipe.id_equipe 
      from valores join equipe
      on valores.id_valor = equipe.id_valor;`
        const result = await mysql.execute(query);



        const response = {

            quantidade: result.length,
            valores_equipe: result.map(equipe => {

                return {
                   equipe_nomes :{
                    nomes: equipe.equipe_nomes
                   },
                   
                  valores:{
                   
                    valor_cartao: equipe.valor_cartao,
                    valor_dinheiro: equipe.valor_dinheiro,
                    valor_pix: equipe.valor_pix,
                    valor_pic_pay: equipe.valor_pic_pay
                  },

                
                  data:{
                    data_valor: equipe.data_valor
                  },
                    qtd_pessoas: equipe.qtd_pessoas,
                    id_equipe: equipe.id_equipe,
                    id_valor: equipe.id_valor,

                    request: {
                        tipo: 'GET',
                        descricao: 'lisa de equipes',
                        url: 'http://localhost:3000/equipe/' + equipe.id_equipe
                    }
                }
            }),
           
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error }),
            console.log(error);
    }

}
