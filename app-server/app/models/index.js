const { Model } = require('objection');
const knexConn = require('../knex/setup.js');

// * Connecting model to database
Model.knex(knexConn);

const User = require('./user');
const Bill = require('./bill');
const BillItem = require('./bill_item');

module.exports = {
    User,
    Bill,
    BillItem
}