const { combineResolvers } = require('graphql-resolvers');
const { UserInputError } = require('apollo-server');
const validator = require('validator');

// * Authorization resolvers
const { isAuthenticated, isBillIssuer } = require('./authorization');

// * Bill resolvers
module.exports = {

    // * Graphql querys
    Query: {
        // * Get one bill
        bill: combineResolvers(
            // * Validate the ownership of logged user on requested bill 
            isBillIssuer,
            async (
                parent,
                { billId },
                { models: { Bill } }
            ) => {
                // * Find and return requested bill
                const bill = await Bill.query().eager('items').findById(billId);
                return bill;
            }
        ),
        // * Get all bills that belong to the logged user
        bills: combineResolvers(
            // * Authentication verification
            isAuthenticated, 
            async (
                parent,
                args,
                { models: { User }, userId }
            ) => {
                // * Find all bills of the user logged using data in context object
                const { bills } = await User.query().eager(`[ bills(orderByCreatedAt).[ items ] ]`, {
                    orderByCreatedAt: builder => {
                      builder.orderBy('created_at', 'desc');
                    }
                  }).findById(userId);
                return bills;
            }
        )
    },

    // * Graphql mutations
    Mutation: {        
        // * Create new bill
        billAdd: combineResolvers(
            // * Authentication verification
            isAuthenticated,
            async (
                parent,
                { input: { customer, items } },
                { models: { Bill }, userId },
            ) => {

                // * Validations

                if(!validator.isLength(customer, {min:1, max:150})) 
                throw new UserInputError('Customer min length is 1 character and max length is 150 characters.');

                // * Items validations
                items.forEach((item) => { 

                    if(!validator.isLength(item.name, {min:1, max:150}))
                        throw new UserInputError('Item name min length is 1 character and max length is 150 characters.');
                    
                    if(Number.isNaN(item.price))
                        throw new UserInputError('Price should be a numeric value');
                    
                    if(item.price < 0)
                        throw new UserInputError('Price can not be less than 0');
                    
                    if(Number.isNaN(item.tax))
                        throw new UserInputError('Tax should be a numeric value');
                    
                    if(item.tax < 0)
                        throw new UserInputError('Tax can not be less than 0');

                    if(Number.isNaN(item.numberItems))
                        throw new UserInputError('Number of items should be a numeric value');

                    if(item.numberItems < 1)
                        throw new UserInputError('Number of items can not be less than 1');

                    if(Number.isNaN(item.totalItem))
                        throw new UserInputError('totalItem should be a numeric value');

                    if(item.totalItem < 0)
                        throw new UserInputError('totalItem can not be less than 0');

                });

                // * Build object to insert
                const bill = {
                    user_id: userId,
                    customer,
                    items
                }

                // * Insert bill data and return it
                const billAdded = await Bill.query().insertGraph(bill).returning('*');
                return billAdded;            
            }
        ),
        // * Delete bill
        billDelete:  combineResolvers(
             // * Validate the ownership of logged user on bill for delete 
            isBillIssuer,
            async (
                parent,
                { billId },
                { models: { Bill } },
            ) => {

                // * Delete bill
                const result = Bill.query().deleteById(billId);
                
                // * Return true if delete was successful
                if(result > 0) return true;

                // * Otherwase return the result of the query
                return result;
            }
        )
    }
}