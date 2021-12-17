
const { response, query } = require('express');
const mysql = require('../mysql');

exports.getColaborador = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM colaborador;")
        const response = {
            quantidade: result.length,
            colaboradores: result.map(prod => {
                return {
                    id_colaborador: prod.id_colaborador,
                    nome: prod.nome,
                    setor: prod.setor,
                    imagem_colaborador: prod.imagem_colaborador,
                    request: {
                        tipo: 'GET',
                        descricao: '',
                        url: 'http://localhost:3000/colaborador/' + prod.id_colaborador
                    }
                }
            })
        }

        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }


}

//insere um colaborador
exports.postInsereColaborador = async (req, res, next) => {
    try {
        const query = "INSERT INTO colaborador (nome, setor, imagem_colaborador) VALUES (?,?,?)";
        const result = mysql.execute(query, [
            req.body.nome,
            req.body.setor,
            req.file.path
        ]);

        const response = {
            mensagem: "Colaboradaor inserido com sucesso",
            idColaboradorCriado: result.id_colaborador,
            nome: req.body.nome,
            setor: req.body.setor,
            imagem: req.file.path,
            request: {
                tipo: 'POST',
                descricao: "Criando um colaborador",
                url: 'http://localhost:3000/colaborador'
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log("response");
        return res.status(500).send({ error: error })
    }
}




// lista um colaborador
exports.getListaUmColaborador = async (req, res, next) => {
    try {
        const query = "SELECT * FROM colaborador WHERE id_colaborador = ?;";
        const result = await mysql.execute(query, [req.params.id_colaborador]);

        if (result.length == 0) {
            return res.status(404).send({
                message: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            colaborador: {
                idColaboradorCriado: result[0].id_colaborador,
                nome: result[0].nome,
                setor: result[0].setor,
                imagem_colaborador: result[0].imagem_colaborador,
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



//altera um colaborador
exports.getAlteraUmcolaborador = (req, res, next) => {
    try {
        const query = `UPDATE colaborador
     SET nome    = ?,
         setor   = ?
     WHERE id_colaborador= ? `;
        mysql.execute(query, [
            req.body.nome,
            req.body.setor,
            req.body.id_colaborador
        ]);

        const response = {
            mensagem: "Colaborador atualizado com sucesso",
            colaboradorAtualizado: {
                idrecebetips: req.body.id_colaborador,
                nome: req.body.nome,
                preco: req.body.setor,
                request: {
                    tipo: 'PATCH',
                    descricao: 'Colaborador atualizado com sucesso ' + req.body.id_colaborador,
                    url: 'http://localhost:3000/colaborador'
                }
            }
        }
        return res.status(202).send(response)


    } catch (error) {
        return res.status(500).send({ error: error });
    }
}


//deleta um colaborador 
exports.getDeletaUmcolaborador = async (req, res, next) => {
    try {
        const query = "DELETE FROM colaborador WHERE id_colaborador = ?";
        await mysql.execute(query, [req.params.id_colaborador]);

        const response = {
            mensagem: "colaborador deletado com sucesso",
            request: {
                tipo: 'POST',
                descricao: 'INSERE UM PRODUTO',
                url: 'http://localhost:3000/colaborador',
                body: {
                    nome: 'String',
                    setor: 'String'
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })

    }
}

//insere imagem
exports.postInsereImagem = async (req, res, next) => {
    try {
        const query = "INSERT INTO imagem_colaborador (id_colaborador, caminhho) VALUES (?,?)";
        const result = mysql.execute(query, [
            req.params.id_colaborador,
            req.file.path
        ]);

        const response = {
           mensagem:"Imagem inserida com sucesso",
           imagemCriada : {
               id_colaborador: req.params.id_colaborador,
               id_imagem: result.insertId,
               imagem_colaborador: req.file.path
           }
            
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log("response");
        return res.status(500).send({ error: error })
    }
}




//lista imagens 
exports.getListaImagens = async (req, res, next) => {
    try {
        const  query = "SELECT * FROM imagem_colaborador WHERE id_colaborador = ?;"
        const result = await mysql.execute(query, [req.params.id_colaborador])
        const response = {
            quantidade: result.length,
            
            imagens: result.map(img => {
                return {
                    id_colaborador:req.body.id_colaborador,
                    id_imagem: img.id_colaborador,
                    caminho: "http://localhost:3000/colaborador/"+  img.id_colaborador  +"/imagens"
                
                   
                   
                }
            })
        }

        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }




}