exports.up = function(knex) {
    return knex.schema.createTable('ferias', function(table) {
        table.increments('id').primary();
        table.integer('numDias').notNullable();
        table.integer('vendaDias').notNullable();
        table.date('dataInicio').notNullable();
        table.date('dataFinal').notNullable();

        table.string('usuario_id').notNullable();
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ferias');
};