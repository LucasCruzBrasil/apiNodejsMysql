//lista  ghfghf
const mysql = require('../mysql');


exports.getGruja = async (req, res, next) => {
  try {
    const query = `SELECT gruja.id_gruja,
    gruja.valor,
    gruja.data,
    colaborador.id_colaborador,
    colaborador.nome,
    colaborador.setor
    FROM gruja
    INNER JOIN colaborador
    ON gruja.id_colaborador = colaborador.id_colaborador;`
    const result = await mysql.execute(query);

    const response = {
      quantidade: result.length,
      gorjetas: result.map(gorjeta => {
        return {
          id_colaborador: gorjeta.id_colaborador,
          id_gruja: gorjeta.id_gruja,

          id_colaborador: gorjeta.id_colaborador,
          nome: gorjeta.nome,
          setor: gorjeta.setor
          ,
          valor: gorjeta.valor,
          data: gorjeta.data,

          request: {
            tipo: 'GET',
            descricao: 'lisa de gorjetas da equipe',
            url: 'http://localhost:3000/gruja/' + gorjeta.id_colaborador
          }
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }

}

//insere
exports.postGruja = async (req, res, next) => {
  try {

    // 1 Nessa parta analiza se o id realmente existe
    const queryAnalizaId = 'SELECT * FROM colaborador WHERE id_colaborador=?';
    const resultId = await mysql.execute(queryAnalizaId, [req.body.id_colaborador]);
    if (resultId.length == 0) {
      return res.status(404).send({
        mensagem: 'Não fio encotrado nenhuma  colaborador com esse id'
      })
    }


    // 2 então se existe o id, é inserido os dados requiridos.
    const query = "INSERT INTO gruja (id_colaborador, valor, data) VALUES (?,?,?)";
    const result = await mysql.execute(query, [req.body.id_colaborador, req.body.valor, req.body.data]);

    //aqui vem a resposta 
    const response = {
      mensagem: "Gruja inserida com sucesso",
      GrujaIseridaParaId: req.body.id_colaborador,

      valor: req.body.valor,
      data: req.body.data,

      request: {
        tipo: 'POST',
        descricao: "Adicionando uma gorjeta para um colaborador",
        url: 'http://localhost:3000/gruja'
      }
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }

}

//lista por id específico
exports.getUmaGrujaEspecifica = async (req, res, next) => {
  try {
    const query = "SELECT * FROM gruja WHERE id_gruja = ?;";
    const result = await mysql.execute(query, [req.params.id_gruja]);

    if (result.length == 0) {
      return res.status(404).send({
        mensagem: 'Não fio encotrada nenhuma grojeta com esse id'
      })
    }
    const response = {
      colaborador: {
        id_gruja: result[0].id_gruja,
        valor: result[0].valor,
        data: result[0].data,
        request: {
          tipo: 'GET',
          descricao: 'Retorna uma gorjeta específica ',
          url: 'http://localhost:3000/gruja'
        }
      }
    }
    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send({ error: error })
  }


};

//atualiza uma gorjeta
exports.getAtualizaUmaGorjeta = async (req, res, next) => {
  try {

    const query = `UPDATE gruja
    SET valor    = ?,
        data   = ?
    WHERE id_gruja= ? `;

    const result = await mysql.execute(query, [
      req.body.valor,
      req.body.data,
      req.body.id_gruja]);

    const response = {
      mensagem: "Gorjeta do colaborador atualizado com sucesso",
      GorjetaAtualizada: {
        id_gruja: req.body.id_gruja,
        valor: req.body.valor,
        data: req.body.data,
        request: {
          tipo: 'PATCH',
          descricao: 'gorjeta atualizado com sucesso para o valor ' + req.body.valor,
          url: 'http://localhost:3000/gruja'
        }
      }
    }
    return res.status(202).send(response);


  } catch (error) {
    return res.status(500).send({ error: error })
  }


}

//deleta uma gorjeta
exports.getDeletaUmaGorjeta = async (req, res, next) => {
  try {
    const query = "DELETE FROM gruja WHERE id_gruja = ?";
    const result = await mysql.execute(query, [req.params.id_gruja]
    )
    const response = {

      mensagem: "grojeta deletada com sucesso",

      request: {
        tipo: 'POST',
        descricao: 'INSERE UMA GORJETA',
        url: 'http://localhost:3000/gruja',
        body: {
          id_gruja: result,
        }
      }
    }
    return res.status(202).send(response);

  } catch (error) {
    res.status(500).send({
      mensagem: error,
      response: null
    })
  }
}


//pega pelo nome da gorjeta 
exports.getNomeGruja = async (req, res, next) => {
  try {
    const query = `SELECT id_gruja,
    gruja.valor,
    gruja.data,
    colaborador.id_colaborador,
    colaborador.nome,
    colaborador.setor
    FROM gruja
    INNER JOIN colaborador
    ON gruja.id_colaborador = colaborador.id_colaborador
    WHERE nome = ?`
    const result = await mysql.execute(query, [req.params.nome]);

    const response = {
      quantidade: result.length,
      gorjetas: result.map(gorjeta => {
        return {
          id_colaborador: gorjeta.id_colaborador,
          id_gruja: gorjeta.id_gruja,

          id_colaborador: gorjeta.id_colaborador,
          nome: gorjeta.nome,
          setor: gorjeta.setor
          ,
          valor: gorjeta.valor,
          data: gorjeta.data,

          request: {
            tipo: 'GET',
            descricao: 'lisa de gorjetas da equipe',
            url: 'http://localhost:3000/gruja/' + gorjeta.id_colaborador
          }
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

//soma valores totais da gorjeta pelo nome 
exports.getValorByName = async (req, res, next) => {
  try {
    const query = `SELECT SUM(gruja.valor) AS total
    FROM gruja INNER JOIN colaborador
        ON gruja.id_colaborador = colaborador.id_colaborador
         WHERE nome = ?`
    const result = await mysql.execute(query, [req.params.nome])
    
    const response = {
      
     
      gorjetas: result.map(gorjeta => {
        return {
          total: gorjeta.total,
         
         

          request: {
            tipo: 'GET',
            descricao: 'soma de gorjetas de um colaborador',
            url: 'http://localhost:3000/gruja/'
          }
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}