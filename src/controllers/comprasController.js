const connection = require('../database/connection');

const faturasController = require('./faturasController');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
        const id_usuario = response.locals.idUser;
        const {id} = request.params;
        if(id){
            const compras = await connection('compras')
            .where({usuario_id: id_usuario,
                id: id})
            .select([
                'id',
                'produto',
                'valor',
                'dataCompra',
                'numParcelas',
                'valorParcelas',
                'loja_id',
                'cartao_id',
                'usuario_id'
            ]);
            
            return response.json(compras);
            
        }
        else{
            const compras = await connection('compras')
            .where('compras.usuario_id', '=', id_usuario)
            .join('cartoes', 'compras.cartao_id', '=', 'cartoes.id')
            .join('lojas', 'compras.loja_id', '=', 'lojas.id')
            .limit(20)
            .offset((page -1)*20)
            .select([
                'compras.id',
                'compras.produto',
                'compras.valor',
                'compras.dataCompra',
                'compras.numParcelas',
                'compras.valorParcelas',
                'compras.loja_id',
                'lojas.nome',
                'compras.cartao_id',
                'cartoes.nomeCard'
                
            ]);
            return response.json(compras);
        }
    },
    async create(request, response){
        const {produto, valor, dataCompra, numParcelas, valorParcelas, loja_id, cartao_id} = request.body;
        const usuario_id = response.locals.idUser;

        const [cartao] = await connection('cartoes').where('id', '=', cartao_id).select(['usuario_id', 'limiteD']);
        if (cartao.usuario_id == usuario_id){
            const [id] = await connection('compras')
                .insert({
                    produto,
                    valor,
                    dataCompra,
                    numParcelas,
                    valorParcelas,
                    usuario_id,
                    loja_id,
                    cartao_id
                });
            var limiteD = cartao.limiteD-valor;
            await connection('cartoes').where('id', '=', cartao_id).update({limiteD: limiteD});
            faturasController.create(id);
            return response.status(204).send()
        }

        return response.status(401).json({error: 'Operation not permited'});
        
    },

    async delete(request, response){
        const {id} = request.params;
        const usuario_id = response.locals.idUser;

        const compra = await connection('compras')
        .select(['usuario_id', 'valor', 'cartao_id'])
        .where('id', id)
        .first()

        if (compra.usuario_id == usuario_id){
            const [cartao] = await connection('cartoes').where('id', '=', compra.cartao_id).select('limiteD');
            var limiteD = cartao.limiteD+compra.valor;
            await connection('cartoes').where('id', '=', compra.cartao_id).update({limiteD: limiteD});
            await connection('compras').where('id', '=', id).del();
            faturasController.delete(id);

            return response.status(204).send();
            
        }
        return response.status(401).json({error: 'Operation not permited'});


        
    },

    async modify(request, response){
        const {id, produto, valor, dataCompra, numParcelas, valorParcelas, loja_id, cartao_id} = request.body;
        const usuario_id = response.locals.idUser;
        const compras = await connection('compras')
        .select('usuario_id')
        .where('id', id)
        .first();
        const cartoes = await connection('cartoes')
        .select('usuario_id')
        .where('id', cartao_id)
        .first();


        if (compras.usuario_id == usuario_id){
            if (cartoes.usuario_id == usuario_id){
                await connection('compras')
            .where('id', id)
            .update({
                produto: produto,
                valor: valor,
                dataCompra: dataCompra,
                numParcelas:numParcelas,
                valorParcelas: valorParcelas,
                loja_id: loja_id,
                cartao_id: cartao_id
            });
            faturasController.delete(id);
            faturasController.create(id);
            return response.status(204).send();
            }
            
            

        }
        return response.status(401).json({error: 'Operation not permited'});
    }
}