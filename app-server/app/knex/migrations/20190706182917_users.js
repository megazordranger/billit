
exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.string('id', 150).primary().notNullable()
        table.string('username', 150).unique().notNullable()
        table.string('email', 150).unique().notNullable()
    })
};

exports.down = knex => {
    return knex.schema.dropTable('users')
}
