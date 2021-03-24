const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = response.locals.idUser;
        const {id} = request.params;
        if(id){
            const cartoes = await connection('cartoes')
            .where({usuario_id: id_usuario,
                visivel: 1,
                id: id})
            .select([
                'id', 
                'nomeCard',
                'limiteT',
                'limiteD',
                'diaV',
                'diaF',
                'cor',
                'bandeira_id',
            ]);
            
            return response.json(cartoes);
            
        }
        else{
            const cartoes = await connection('cartoes')
            .join('bandeira', 'bandeira.id', '=', 'cartoes.bandeira_id')
            .select([
                'cartoes.id', 
                'cartoes.nomeCard',
                'cartoes.limiteT',
                'cartoes.limiteD',
                'cartoes.diaV',
                'cartoes.diaF',
                'cartoes.cor',
                'cartoes.bandeira_id',
                'bandeira.descricao',
                'usuario_id'
            ])
            .where({usuario_id: id_usuario,
                    visivel: 1,
            });
            return response.json(cartoes);
        }
    },
    async create(request, response){
            const {nomeCard, limiteT, diaV, diaF, cor, bandeira_id} = request.body;
            const usuario_id = response.locals.idUser;
            const limiteD = limiteT;
            const visivel = 1;
            await connection('cartoes').insert({
                nomeCard,
                limiteT,
                limiteD,
                diaV,
                diaF,
                cor,
                usuario_id,
                visivel,
                bandeira_id
            }); 
            return response.status(204).send();
        },

        async delete(request, response){
            const {id} = request.params;
            const usuario_id = response.locals.idUser;

            const cartao = await connection('cartoes')
            .select('usuario_id')
            .where('id', id)
            .first()

            if (cartao.usuario_id == usuario_id){
                await connection('cartoes').where('id', '=', id).update({visivel: 0});
                return response.status(204).send();
                
            }
            return response.status(401).json({error: 'Operation not permited'});


            
        },

        async modify(request, response){
            const {id, nomeCard, limiteT, diaV, diaF, cor, bandeira_id} = request.body;
            const usuario_id = response.locals.idUser;
            const cartao = await connection('cartoes')
            .select('usuario_id')
            .where('id', id)
            .first();


            if (cartao.usuario_id == usuario_id){
                const antLimite = await connection('cartoes').where('id', id).select(['limiteT', 'limiteD']).first()
                const aumento = limiteT-antLimite.limiteT
                const limiteD = antLimite.limiteD+aumento

                await connection('cartoes')
                .where('id', id)
                .update({
                    nomeCard: nomeCard,
                    limiteT: limiteT,
                    limiteD: limiteD,
                    diaV: diaV,
                    diaF:diaF,
                    cor: cor,
                    bandeira_id: bandeira_id
                });
                return response.status(204).send();
                

            }
            else{
                return response.status(401).json({error: 'Operation not permited'});
            }
        }
        
};