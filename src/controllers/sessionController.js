const crypto = require('crypto');
const connection = require('../database/connection');
const jwt = require('../middlewares/jwt');

module.exports = {
    async create(request, response){
        var {user, senha} = request.body;
        const usuario = await connection('usuarios')
            .where('userName', '=', user)
            .orWhere('email', '=', user)
            .select([
                'id',
                'senha'])
            .first();

        if(usuario){
            senha = crypto.createHash('md5').update(senha).digest('hex');
            if(senha == usuario.senha){
                const token = jwt.sign({idUser: usuario.id})
                return response.json({usuario, token});
            }
            return response.json({error: 'Senha incorreta'})
        }
        return response.json({error: 'Usuario não encontrado'})
    }
}