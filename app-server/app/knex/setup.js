const environment = process.env.ENVIRONMENT || 'production';
const Knex = require('knex');
// * Get database configuration
const connection = require('./knexfile.js')[environment];

// * Create database connection
const knexConnection = Knex(connection);
module.exports = knexConnection;