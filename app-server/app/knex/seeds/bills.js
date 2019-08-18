//* Get fake data to insert
const users = require('./data/users');
const bills = require('./data/bills');
const billItems = require('./data/bill_items');

/**
 * * Empty all tables and populate with fake data
 * * order is important due to relations between tables
 */
exports.seed = async knex => {
    
    await knex('bill_items').del();
    await knex('bills').del();
    await knex('users').del();
    await knex('users').insert(users);
    await knex('bills').insert(bills);
    await knex('bill_items').insert(billItems);
};