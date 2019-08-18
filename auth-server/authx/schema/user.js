const { gql } = require('apollo-server-express');

// * Graphql user schema
module.exports = gql`
    
    extend type Mutation {

        """Register"""
        signUp(
            """User data"""
            input: UserInput!
        ): User! 

        """Login"""
        signIn(
            """Login credentials"""
            input: LoginInput!
        ): User!

        """Login with google"""
        socialSignIn(
            """User data provided for google"""
            input: SocialInput!
        ): User!

        """Logout"""
        signOut: Boolean!
    }

    """The app user"""
    type User {
        """The id of the user"""
        id: ID!
        """The username of the user"""
        username: String!
        """The email of the user"""
        email: String!
        """The session expiration time"""
        expiresIn: String!
    }

    """User data"""
    input UserInput {
        """The username of the user"""
        username: String! @constraint(minLength: 1, maxLength: 150)
        """The email of the user"""
        email: String! @constraint(minLength: 1, maxLength: 150, format: "email")
        """The password of the user"""
        password: String! @constraint(minLength: 8)
        """The confirmation of the password"""
        confirmPassword: String! @constraint(minLength: 8)
        """Aceptation of the term and policies of use"""
        checkPolicies: Boolean! 
    }

    """User credentials"""
    input LoginInput {
        """Username or eamil"""
        login: String! @constraint(minLength: 1, maxLength: 150)
        """User password"""
        password: String! @constraint(minLength: 8)
    }

    """User data provided for google"""
    input SocialInput {
        """The username of the user"""
        username: String! @constraint(minLength: 1, maxLength: 150)
        """The email of the user"""
        email: String! @constraint(minLength: 1, maxLength: 150, format: "email")
    }
`;