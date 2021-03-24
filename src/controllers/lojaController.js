const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const loja = await connection('lojas').select('*');
        return response.json(loja);
    },
    async create(request, response){
        const {nome} = request.body;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('lojas').insert({
                nome
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    },

    async modify(request, response){
        const {nome} = request.body;
        const {id} = request.params;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('lojas')
            .where('id', id)
            .update({
                nome: nome
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    }

}