// * Graphql rate limiter directive schema 
const { createRateLimitTypeDef } = require('graphql-rate-limit-directive');
const { gql } = require('apollo-server-express');
 
const userSchema = require('./user');

// * Graphql main schema used to combine all schemas
const linkSchema = gql`

    directive @constraint(
        # String constraints
        minLength: Int
        maxLength: Int
        startsWith: String
        endsWith: String
        notContains: String
        pattern: String
        format: String

        # Number constraints
        min: Int
        max: Int
        exclusiveMin: Int
        exclusiveMax: Int
        multipleOf: Int
    ) on  FIELD_DEFINITION | INPUT_FIELD_DEFINITION
  
    type Query {
        _: Boolean
    }

    type Mutation @rateLimit(limit: 60, duration: 60){
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

module.exports = [
    createRateLimitTypeDef(), 
    linkSchema, 
    userSchema
];