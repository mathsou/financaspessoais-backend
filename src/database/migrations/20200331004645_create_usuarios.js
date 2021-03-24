exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.string('id').primary();
        table.string('userName').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.decimal('salarioB').notNullable();
        
        table.integer('tipoUser_id').notNullable();
        table.foreign('tipoUser_id').references('id').inTable('tipouser');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
