exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.decimal('salarioB').notNullable();
        
        table.integer('tipoUser_id').unsigned().notNullable();
        table.foreign('tipoUser_id').references('tipoUser.id').onDelete('CASCADE').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
