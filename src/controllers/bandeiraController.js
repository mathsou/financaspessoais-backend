const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const bandeira = await connection('bandeira').select('*');
        return response.json(bandeira);
    },
    async create(request, response){
        const {descricao} = request.body;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('bandeira').insert({
                descricao
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    },

    async modify(request, response){
        const {descricao} = request.body;
        const {id} = request.params;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('bandeira')
            .where('id', id)
            .update({
                descricao: descricao
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    }

}