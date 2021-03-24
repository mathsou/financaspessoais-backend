exports.up = function(knex) {
    return knex.schema.createTable('adicionais', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.decimal('porcentagem').notNullable();

        table.integer('usuario_id').unsigned().notNullable();
        table.integer('tipoAdicional_id').unsigned().notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('tipoAdicional_id').references('id').inTable('tipoAdicional');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adicionais');
};