exports.up = function(knex) {
    return knex.schema.createTable('compras', function(table) {
        table.increments('id').primary();
        table.string('produto').notNullable();
        table.decimal('valor').notNullable();
        table.date('dataCompra').notNullable();
        table.integer('numParcelas').notNullable();
        table.decimal('valorParcelas').notNullable();

        table.integer('usuario_id').unsigned().notNullable();
        table.integer('loja_id').unsigned().notNullable();
        table.integer('cartao_id').unsigned().notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('loja_id').references('id').inTable('lojas');
        table.foreign('cartao_id').references('id').inTable('cartoes').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('compras');
};