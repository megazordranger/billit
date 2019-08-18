const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');

// * If user is authenticated skip to next resolver otherwise return error
const isAuthenticated = (parent, args, { user }) => {
    return user ? skip : new ForbiddenError('Not authenticated as user.');
}

// * Validate the ownership of logged user on bill
const isBillIssuer = combineResolvers(
    isAuthenticated,
    async (
        parent,
        { billId },
        { models: { Bill }, userId },
    ) => {

        // * Get requested bill
        const bill = await Bill.query().eager('items').findById(billId);

        // * If the ownership of the requested bill not belong to user logged throw new error
        if(bill.user_id !==  userId) throw new ForbiddenError('Not authenticated as bill issuer.');

        // * Skip to next resolver
        return skip;
    }
);

module.exports = {
    isAuthenticated,
    isBillIssuer
}