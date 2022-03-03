const e = require('cors');
const mysql = require('../mysql');



//join entre tabela equipe e valores 

exports.getEquipe = async (req, res, next) => {
  try {
    const query = `select valores.id_valor,
    valores.valor_cartao,
    valores.valor_dinheiro,
    valores.valor_pic_pay, 
    valores.valor_pix,
    valores.data_valor, 
    valores.qtd_pessoas, 
     equipe.pessoa_vale,
     equipe.id_equipe,
     colaborador.nome,
     colaborador.setor
   FROM valores join equipe
        on valores.id_valor = equipe.id_valor
  JOIN colaborador
    on colaborador.id_colaborador = equipe.id_colaborador;`

    const result = await mysql.execute(query);
    
    
  
   
    const response = {
      

      quantidade: result.length,
      valores_equipe: result.map(equipe => {
        return {
          valor_do_dia: equipe.valor_cartao + equipe.valor_dinheiro + equipe.valor_pic_pay + equipe.valor_pix,
         
          valor_individual: 
          (equipe.valor_cartao / equipe.qtd_pessoas) + 
          (equipe.valor_dinheiro / equipe.qtd_pessoas) +
          (equipe.valor_pix / equipe.qtd_pessoas) + 
          (equipe.valor_pic_pay / equipe.qtd_pessoas),
         
          nome: equipe.nome,
          qtd_pessoas: equipe.qtd_pessoas,
          data_valor: equipe.data_valor,
          id_valor: equipe.id_valor,
          id_equipe: equipe.id_equipe,
          pessoa_vale: equipe.pessoa_vale
        }
      })
      /*  valores_equipe: result.map(equipe => {
 
         return {
 
           nomes: equipe.nome,
           valor_dinheiro: equipe.valor_dinheiro,
           valor_cartao: equipe.valor_cartao,
           valor_pix: equipe.valor_pix,
           valor_pic_pay: equipe.valor_pic_pay,
           data_valor: equipe.data_valor,
           qtd_pessoas: equipe.qtd_pessoas,
           id_equipe: equipe.id_equipe,
           id_valor: equipe.id_valor,
 
           request: {
             tipo: 'GET',
             descricao: 'lisa de equipes',
             url: 'http://localhost:3000/equipe/' + equipe.id_equipe
           }
         }
       }), */




    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error }),
      console.log(error);
  }

}
