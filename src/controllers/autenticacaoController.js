const connection = require('../database/connection');

module.exports = {
    async token(request, response){
        const id_usuario = response.locals.idUser;

        const usuario = await connection('usuarios')
            .select('id')
            .where('id', '=', id_usuario)
            .first();

        if(usuario){
            response.json({"token": 1});
        }
        else {
            response.json({"token": 0});
        }
    }
}