exports.up = function(knex) {
    return knex.schema.createTable('compras', function(table) {
        table.increments('id').primary();
        table.string('produto').notNullable();
        table.decimal('valor').notNullable();
        table.date('dataCompra').notNullable();
        table.integer('numParcelas').notNullable();
        table.decimal('valorParcelas').notNullable();

        table.string('usuario_id').notNullable();
        table.integer('loja_id').notNullable();
        table.integer('cartao_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('loja_id').references('id').inTable('lojas');
        table.foreign('cartao_id').references('id').inTable('cartoes').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('compras');
};