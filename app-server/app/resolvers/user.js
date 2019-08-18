const { combineResolvers } = require('graphql-resolvers');
const { UserInputError } = require('apollo-server');
const validator = require('validator');

// * Resolver for authentication verification
const { isAuthenticated } = require('./authorization');

// * User resolvers
module.exports = {

    // * Graphql querys
    Query: {
        /**
         * * Query for get logged actual user
         * * the user is getting from context object
         */
        user: combineResolvers(
            // * Authentication verification
            isAuthenticated,
            async (
                parent,
                args,
                { user },
            ) => user
        )
    },

    // * Graphql mutations
    Mutation: {
        /**
         * * Register the user in the app database if not exist
         * * the user is getting from context object
         */
        login: combineResolvers(
            // * Authentication verification
            isAuthenticated,
            async (
                parent,
                args,
                { models: { User }, userId, user },
            ) => {

                // * Validations

                if(user.username.indexOf(' ') !== -1) 
                    throw new UserInputError('Whitespaces in username are not allowed.');
                
                if(!validator.isLength(user.username, {min:1, max:150})) 
                    throw new UserInputError('Username min length is 1 character and max length is 150 characters.');
                
                if(!validator.isEmail(user.email)) 
                    throw new UserInputError('Invalid email.');
                
                if(!validator.isLength(user.email, { min:1, max:150 })) 
                    throw new UserInputError('Email min length is 1 character and max length is 150 characters.');
                
                // * If user exist return it
                const userExist = await User.query().findById(userId);
                if(userExist) return userExist;
                
                // * Insert new user and return it
                const userAdded = await User.query().insert(user).returning('*');
                return userAdded;            
            }
        )
    }
}