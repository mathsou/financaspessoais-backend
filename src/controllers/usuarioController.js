const jwt = require('../middlewares/jwt');

const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const id = response.locals.idUser;
        const usuario = await connection('usuarios')
        .select('userName', 'nome', 'email', 'salarioB')
        .where({id: id});
        return response.json(usuario);
        
    },
    async create (request, response){
        const {userName, nome, email, senha, salarioB} = request.body;
        const tipoUser_id = 1;
        const id = crypto.randomBytes(8).toString('hex');
        await connection('usuarios').insert({
            id,
            userName,
            nome,
            email,
            senha: crypto.createHash('md5').update(senha).digest('hex'),
            salarioB,
            tipoUser_id
        }); 
        const user = {id, nome, salarioB};
        const token = jwt.sign({user: user})
        return response.json({user, token});
        
    },


    async modify(request, response){
        var {userName, nome, email, senha, salarioB} = request.body;
        const id = response.locals.idUser;
        await connection('usuarios')
        .where('id', id)
        .update({
            userName: userName,
            nome: nome,
            email: email,
            senha: crypto.createHash('md5').update(senha).digest('hex'),
            salarioB: salarioB,
        });
        return response.status(204).send();
    }

};