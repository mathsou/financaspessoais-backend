exports.up = function(knex) {
    return knex.schema.createTable('tipoUser', function(table) {
        table.increments('id').primary();
        table.string('descricao').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipoUser');
};
