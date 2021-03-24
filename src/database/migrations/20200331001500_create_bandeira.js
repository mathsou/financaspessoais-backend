exports.up = function(knex) {
    return knex.schema.createTable('bandeira', function(table) {
        table.increments('id').primary();
        table.string('descricao').notNullable();

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bandeira');
};