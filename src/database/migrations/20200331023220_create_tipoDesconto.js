exports.up = function(knex) {
    return knex.schema.createTable('tipodesconto', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipoDesconto');
};