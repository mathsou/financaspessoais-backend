const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const meses = await connection('meses').select('*');
        return response.json(meses);
    },
    async create(request, response){
        const {mes} = request.body;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('meses').insert({
                mes
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    },

    async modify(request, response){
        const {mes} = request.body;
        const {id} = request.params;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('meses')
            .where('id', id)
            .update({
                mes: mes
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    }

}