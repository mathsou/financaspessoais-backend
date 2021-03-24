exports.up = function(knex) {
    return knex.schema.createTable('meses', function(table) {
        table.increments('id').primary();
        table.string('mes').notNullable();

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('meses');
};