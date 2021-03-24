exports.up = function(knex) {
    return knex.schema.createTable('cartoes', function(table) {
        table.increments('id').primary();
        table.string('nomeCard').notNullable();
        table.decimal('limiteT').notNullable();
        table.decimal('limiteD').notNullable();
        table.integer('diaV').notNullable();
        table.integer('diaF').notNullable();
        table.string('cor', 7).notNullable();
        table.boolean('visivel').notNullable();

        table.integer('usuario_id').unsigned().notNullable();
        table.integer('bandeira_id').unsigned().notNullable();
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('bandeira_id').references('id').inTable('bandeira').onUpdate('CASCADE');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cartoes');
};
