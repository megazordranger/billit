const { gql } = require('apollo-server-express');

module.exports = gql`

    """Item of the bill"""
    type BillItem {
        """The Id of the item"""
        id: ID!
        """The Id of the bill owner of the item"""
        bill_id: ID!
        """The name of the item"""
        name: String!
        """The price for the item"""
        price: Float!
        """The tax for the item"""
        tax: Float!
        """The amount of this item for bill"""
        numberItems: Int!
        """Total bill for this item"""
        totalItem: Float!
    }

    """Data of bill item"""
    input BillItemInput {
        """The name of the item"""
        name: String! @constraint(minLength: 1, maxLength: 150)
        """The price for the item"""
        price: Float! @constraint(min: 0)
        """The tax for the item"""
        tax: Float! @constraint(min: 0)
        """The amount of this item for bill"""
        numberItems: Int! @constraint(min: 1)
        """Total bill for this item"""
        totalItem: Float! @constraint(min: 0)
    }
`;