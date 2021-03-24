exports.up = function(knex) {
    return knex.schema.createTable('descontos', function(table) {
        table.increments('id').primary();
        table.decimal('porcentagem').notNullable();
        table.decimal('valor').notNullable();

        table.integer('usuario_id').unsigned().notNullable();
        table.integer('tipoDesconto_id').unsigned().notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('tipoDesconto_id').references('id').inTable('tipoDesconto').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('descontos');
};