exports.up = function(knex) {
    return knex.schema.createTable('faturas', function(table) {
        table.increments('id').primary();
        table.integer('ano').notNullable();
        table.decimal('valor').notNullable();

        table.integer('cartao_id').notNullable();
        table.integer('mes_id').notNullable();
        table.integer('compras_id').notNullable();
        table.boolean('paga').notNullable();
        table.integer('fechamento');
        table.integer('vencimento');
        
        table.foreign('cartao_id').references('id').inTable('cartoes').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('mes_id').references('id').inTable('meses');
        table.foreign('compras_id').references('id').inTable('compras').onDelete('CASCADE').onUpdate('CASCADE');

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('faturas');
};