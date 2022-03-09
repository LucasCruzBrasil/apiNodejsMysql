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
     
 }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error }),
      console.log(error);
  }
  

}

//insere  pessoas na equipe para receber valores
exports.postInsereEquipe = async (req, res, next) => {
  try {
      const query = "INSERT INTO equipe (id_valor, id_colaborador, pessoa_vale ) VALUES (?,?,?)";
      const result = await mysql.execute(query, [
          req.body.id_valor,
          req.body.id_colaborador,
          req.body.pessoa_vale,

      ]);
     
         const response = {

          mensagem: "Pessoa inserida na equipe com sucesso",
          id_valor: result.id_valor,
          valor_cartao: req.body.id_colaborador,
          valor_dinheiro: req.body.pessoa_vale,
         
          request: {
              tipo: 'POST',
              descricao: "Equipe",
              url: 'http://localhost:3000/equipe'
          }
      }
      return res.status(201).send(response);
  } catch (error) {
      console.log("response");
      return res.status(500).send({ error: error })
  }
}
