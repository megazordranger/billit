const { gql } = require('apollo-server-express');

module.exports = gql`

    
    extend type Query {
        """Get user data"""
        user: User!
    }

    extend type Mutation {
        """Insert the user in the app DB if not exist
        user data is getting from context object"""
        login: User!
    }

    """The app user"""
    type User {
        """The id of the user"""
        id: ID!
        """The username of the user"""
        username: String!
        """The email of the user"""
        email: String!
    }
`;