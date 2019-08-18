
exports.up = knex => {
    return knex.schema.createTable('bills', table => {
        table.increments('id').primary()
        table.string('user_id', 150).references('users.id').onDelete('CASCADE').notNullable()
        table.string('customer', 150).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
};

exports.down = knex => {
    return knex.schema.dropTable('bills')
}
