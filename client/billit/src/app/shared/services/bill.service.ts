import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/**
 * Service for bill CRUD
 */
@Injectable()
export class BillService {

    /**
     * @ignore
     */
    constructor(
        private apollo: Apollo
    ) { }

    /**
     * Get logged user
     */
    getUser() {
        const query = gql`
            query {
                user {
                    username
                    email
                }
            }
        `;
    
        return this.apollo.query({ query });
    }

    /**
     * Get one specific bill
     */
    getBill(billId: number) {
        
        const query = gql`
            query bill($billId: ID!){
                bill(billId: $billId) {
                    customer
                    created_at
                    items {
                        name
                        price
                        tax
                        numberItems
                        totalItem
                    }
                }
            }
        `;

        return this.apollo.query({
            query,
            variables: {
                billId
            }
        });
    }

    /**
     * Get all bills owned by logged user
     */
    getBills() {
        const query = gql`
            query {
                bills {
                    id
                    customer
                    created_at
                    items {
                        name
                        price
                        tax
                        numberItems
                        totalItem
                    }
                }
            }
        `;
    
        return this.apollo.query({ query });
    }

    /**
     * Create new bill
     */
    createBill(variables) {
        const mutation = gql`
            mutation billAdd($input: BillInput!){
                billAdd (
                    input: $input
                ) {
                    id
                    user_id
                    customer
                    created_at
                    items {
                        id
                        bill_id
                        name
                        price
                        tax
                    }
                }
            }
        `;

        return this.apollo.mutate({ mutation, variables });
    }

    /**
     * Delete bill
     */
    deleteBill(billId: number) { 
        const mutation = gql`
            mutation billDelete($billId: ID!) {
                billDelete (billId: $billId) 
            }
        `;

        return this.apollo.mutate({ 
            mutation, 
            variables: {
                billId
            }
         });
    }
}