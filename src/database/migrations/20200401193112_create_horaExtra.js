exports.up = function(knex) {
    return knex.schema.createTable('horaextra', function(table) {
        table.increments('id').primary();
        table.decimal('numHoras').notNullable();
        table.decimal('porcentagem').notNullable();


        table.integer('usuario_id').unsigned().notNullable();
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('horaExtra');
};