const { GraphQLDateTime } = require('graphql-iso-date');

const userResolvers = require('./user');
const billResolvers = require('./bill');

const customScalarResolver = {
    Date: GraphQLDateTime,
};

module.exports = [
    customScalarResolver,
    userResolvers,
    billResolvers
];