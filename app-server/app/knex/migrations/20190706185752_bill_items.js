
exports.up = knex => {
    return knex.schema.createTable('bill_items', table => {
        table.increments('id').primary()
        table.integer('bill_id').references('bills.id').onDelete('CASCADE').notNullable()
        table.string('name', 150).notNullable()
        table.float('price').notNullable()
        table.float('tax').notNullable()
        table.integer('numberItems').notNullable()
        table.float('totalItem').notNullable()
    })
};

exports.down = knex => {
    return knex.schema.dropTable('bill_items')
}
