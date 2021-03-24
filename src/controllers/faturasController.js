const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_usuario = response.locals.idUser;
        const {page = 1} = request.query;
        
        const mesesAnos = await connection('faturas')
        .join('meses', 'meses.id', '=', 'faturas.mes_id')
        .join('cartoes', 'cartoes.id', '=', 'faturas.cartao_id')
        .where('cartoes.usuario_id', '=', id_usuario)
        .orderBy([{column: 'ano'}, {column: 'mes_id'}])
        .limit(6)
        .offset((page-1)*6)
        .distinct([
            'faturas.ano',
            'faturas.mes_id',
            'meses.mes', 
            'faturas.paga'
        ]);
        var pagina=(page-1)*6
        var tamanho = mesesAnos.length;
        if(mesesAnos[0] !== undefined){
            const faturas = await connection('faturas')
            .join('meses', 'meses.id', '=', 'faturas.mes_id')
            .join('cartoes', 'cartoes.id', '=', 'faturas.cartao_id')
            .join('compras', 'compras.id', '=', 'faturas.compras_id')
            .where('cartoes.usuario_id', '=', id_usuario)
            .andWhere(function(){
                this.where({mes_id: mesesAnos[0].mes_id,
                            ano: mesesAnos[0].ano})   
                .orWhere({mes_id: mesesAnos[1]?mesesAnos[1].mes_id:0,
                        ano: mesesAnos[1]?mesesAnos[1].ano:0})
                .orWhere({mes_id: mesesAnos[2]?mesesAnos[2].mes_id:0,
                        ano: mesesAnos[2]?mesesAnos[2].ano:0})
                .orWhere({mes_id: mesesAnos[3]?mesesAnos[3].mes_id:0,
                        ano: mesesAnos[3]?mesesAnos[3].ano:0})
                .orWhere({mes_id: mesesAnos[4]?mesesAnos[4].mes_id:0,
                        ano: mesesAnos[4]?mesesAnos[4].ano:0})
                .orWhere({mes_id: mesesAnos[5]?mesesAnos[5].mes_id:0,
                        ano: mesesAnos[5]?mesesAnos[5].ano:0})
            })
            .select([
                'faturas.id',
                'faturas.ano',
                'faturas.mes_id',
                'meses.mes',
                'faturas.compras_id',
                'compras.produto',
                'faturas.valor',
                'cartoes.nomeCard',
                'faturas.paga'   
            ]);

            const produtos = await connection('faturas')
            .join('cartoes', 'cartoes.id', '=', 'faturas.cartao_id')
            .join('compras', 'compras.id', '=', 'faturas.compras_id')
            .where('cartoes.usuario_id', '=', id_usuario)
            .distinct('compras.produto', 'compras.id')
            
            return response.json([faturas, mesesAnos, produtos]);

        }
        else{
            return response.json([])
        }
                
        
        
         
        
    },

    async create(id){
        var i;
        const compras = await connection('compras')
            .join('cartoes', 'cartoes.id', '=', 'compras.cartao_id')
            .where('compras.id', '=', id)
            .select([
                'compras.id',
                'compras.dataCompra',
                'compras.numParcelas',
                'compras.valorParcelas',
                'compras.cartao_id',
                'cartoes.diaF',
                'cartoes.diaV'
            ])
            .first();

            const cartoes = await connection('cartoes').where('id', '=', compras.cartao_id).select('diaF').first();
            var ano = parseInt(compras.dataCompra.slice(0, 4))
            var mes = parseInt(compras.dataCompra.slice(5, 7))
            var dia = parseInt(compras.dataCompra.slice(8))
            
            for(i=0; i<parseInt(compras.numParcelas); i++){
                if(i==0 && dia>=cartoes.diaF){
                    mes++;
                }
                mes++;
                if(mes == 13){
                    mes = 1;
                    ano++
                }
                await connection('faturas')
                    .insert({
                        ano: ano,
                        mes_id: mes,
                        valor: parseFloat(compras.valorParcelas),
                        cartao_id: parseInt(compras.cartao_id),
                        compras_id: parseInt(compras.id),
                        fechamento: parseInt(compras.diaF),
                        vencimento: parseInt(compras.diaV),
                        paga: 0

                    })
            } 
            
             

    },
    async delete(compras_id){
        await connection('faturas')
            .where('compras_id', '=', compras_id)
            .del()

    },

    async modify(request, response){
        const id_usuario = response.locals.idUser;
        const {mes, ano, cartao_id, fechamento, vencimento} = request.body

        const faturas = await connection('faturas')
            .join('cartoes', 'cartoes.id', '=', 'faturas.cartao_id')
            .where('cartoes.usuario_id', '=', id_usuario)
            .andWhere('faturas.cartao_id', '=', cartao_id)
            .andWhere('faturas.ano', '=', ano)
            .andWhere('faturas.mes_id', '=', mes)
            .update({
                fechamento: fechamento,
                vencimento: vencimento
            })
        if(faturas){
            return response.status(204).send();
        }
        return response.status(400).send()


    }
}