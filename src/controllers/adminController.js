const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id = response.locals.idUser;
        const {cod} = request.params;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', id).first();
        
        if(admin.tipoUser_id == 1){
            if(cod == 1){
                const usuario = await connection('usuarios').select('*');
                return response.json(usuario);
            }
            const usuarios = await connection('usuarios').select('id', 'userName', 'nome', 'email', 'tipoUser_id');
            return response.json(usuarios);
            
        }  
        return response.status(401).json({error: 'Operation not permited'});  
    },

    async modify(request, response){
        const id = response.locals.idUser;
        const admin = await connection('usuarios').select('tipoUser_id').where('id', id).first();
        if (admin.tipoUser_id == 1){
            const {userName, tipoUser_id} = request.body;
            await connection('usuarios')
            .where('userName', userName)
            .update({tipoUser_id: tipoUser_id});

            return response.json().status(204);
        }
        return response.status(401).json({error: 'Operation not permited'});
    }
}