exports.up = function(knex) {
    return knex.schema.createTable('descontos', function(table) {
        table.increments('id').primary();
        table.decimal('porcentagem').notNullable();
        table.decimal('valor').notNullable();

        table.string('usuario_id').notNullable();
        table.integer('tipoDesconto_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('tipoDesconto_id').references('id').inTable('tipodesconto').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('descontos');
};