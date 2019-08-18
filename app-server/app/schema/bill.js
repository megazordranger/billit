const { gql } = require('apollo-server-express');

module.exports = gql`

    extend type Query {
        """Get one bill"""
        bill(
            """The Id of bill"""
            billId: ID!
        ): Bill!
        """Get all bills of the actual user
        the id fo user is getting from context object"""
        bills: [Bill!]!
    }

    extend type Mutation {
        """Add new bill"""
        billAdd(
            """The data of the bill"""
            input: BillInput!
        ): Bill!
        """Delete one bill"""
        billDelete(billId: ID!): Boolean!
    }

    """The bill generate for the user"""
    type Bill {
        """The Id of bill"""
        id: ID!
        """The Id of the user owner of the bill"""
        user_id: ID!
        """The customer of the bill"""
        customer: String!
        """Creation date of the bill"""
        created_at: Date!
        """Items that bellow to bill"""
        items: [BillItem!]!
    }

    """Data for new bill"""
    input BillInput {
        """The customer of the bill"""
        customer: String! @constraint(minLength: 1, maxLength: 150)
        """Items that bellow to bill"""
        items: [BillItemInput!]!
    }
`;