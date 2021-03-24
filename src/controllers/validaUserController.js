const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        var {userName} = request.body;
        const usuario = await connection('usuarios')
        .select('userName')
        .where('userName', '=', userName)
        .first();        
        return response.json(usuario);
        

        
    }
}