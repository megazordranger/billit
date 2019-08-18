const { AuthenticationError, UserInputError } = require('apollo-server');
const validator = require('validator');

const environment = process.env.NODE_ENV;
const { cookieOptions } = require('../config')[environment];

module.exports = {

    // * Graphql mutations
    Mutation: {
        // * User register
        signUp: async (
            parent,
            { 
                input: { 
                    username, 
                    email = validator.normalizeEmail(this.email), 
                    password,
                    confirmPassword,
                    checkPolicies
                } 
            },
            { models, res },
        ) => {
            

            // * Validations

            if(checkPolicies !== true) 
                throw new UserInputError('You must accept terms and policies');

            if(username.indexOf(' ') !== -1) 
                throw new UserInputError('Whitespaces in username are not allowed.');
            
            if(!validator.isLength(username, { min:1, max:150 })) 
                throw new UserInputError('Username min length is 1 character and max length is 150 characters.');
            
            if(!validator.isEmail(email)) 
                throw new UserInputError('Invalid email.');
            
            if(!validator.isLength(email, { min:1, max:150 })) 
                throw new UserInputError('Email min length is 1 character and max length is 150 characters.');
            
            if(!validator.isLength(password, { min:8 })) 
                throw new UserInputError('Password min length is 8 characters.');
            
            if(password !== confirmPassword)
                throw new UserInputError("Passwords don't match.");

            const usernameExist = await models.User.findOne({$or:[{username}]});
            if (usernameExist) 
                throw new UserInputError('Username already exist.');
        
            const emailExist = await models.User.findOne({$or:[{email}]});
            if (emailExist) 
                throw new UserInputError('Email already exist.');
            
            // * Creating new user document
            const user = new models.User({
                username, 
                email,
            });

            // * Generate password hash
            await user.generatePasswordHash(password);
            // * Save user in DB
            await user.save();
            // * Generate token
            const { token, expiresIn } = await user.generateJwt();

            // * Send token within cookie and user data object
            res.cookie("SESSIONID", token, cookieOptions);
            return {
                ...user.data,
                expiresIn
            }
        },
        // * User login
        signIn: async (
            parent,
            { 
                input: { 
                    login, 
                    password = validator.normalizeEmail(this.email),
                } 
            },
            { models, res },
        ) => {

            // * Validations

            if(login.indexOf(' ') !== -1) 
                throw new UserInputError('Whitespaces are not allowed.');
            
            if(!validator.isLength(login, { min:1, max: 150 })) 
                throw new UserInputError('Login credential min length is 1 character and max length is 150 characters.');
            
            if(!validator.isLength(password, { min:8 })) 
                throw new UserInputError('Password min length is 8 characters.');

            const user = await models.User.findOne({$or:[{username: login},{email: login}]});
            if (!user) 
                throw new UserInputError('No user found with this login credentials.');

            const isValid = await user.validatePassword(password);
            if (!isValid) 
                throw new AuthenticationError('Invalid password.');
            
            // * Generate token 
            const { token, expiresIn } = await user.generateJwt();
            
            // * Send token within cookie and user data object
            res.cookie("SESSIONID", token, cookieOptions);
            return {
                ...user.data,
                expiresIn
            }
        },
        // * User register/login with google
        socialSignIn: async (
            parent,
            { 
                input: { 
                    username, 
                    email
                } 
            },
            { models, res },
        ) => {

            // * Validations

            if(username.indexOf(' ') !== -1) 
                throw new UserInputError('Whitespaces are not allowed.');

            if(!validator.isLength(username, {min:1, max:150})) 
                throw new UserInputError('Username min length is 1 character and max length is 150 characters.');

            if(!validator.isEmail(email)) 
                throw new UserInputError('Invalid email.');
            
            if(!validator.isLength(email, { min:1, max:150 })) 
                throw new UserInputError('Email min length is 1 character and max length is 150 characters.');
            
            // * Find user and create if not exist
            const { doc: user } = await models.User.findOrCreate({ username }, { email });
            // * Generate token
            const { token, expiresIn } = await user.generateJwt();

            // * Send token within cookie and user data object
            res.cookie("SESSIONID", token, cookieOptions);
            return {
                ...user.data,
                expiresIn
            }
        },
        // * User logout
        signOut: async (
            parent,
            args,
            { res },
        ) => {
            // * Clear cookie
            res.clearCookie("SESSIONID", { domain: cookieOptions.domain });
            return true;
        }
    },

}