module.exports = {
    async index(request, response){
        const tipoUser = await connection('tipoUser').select('*');
        return response.json(tipoUser);
    },
    async create(request, response){
        const {descricao} = request.body;
        const usuario_id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', usuario_id).first();
        if(admin.tipoUser_id == 1){
            await connection('lojas').insert({
                nome
            });
            return response.status(204).send();
        }
        return response.status(401).json({error: 'Operation not permited'});
    }
}