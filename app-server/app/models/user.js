const { Model } = require('objection');
const Bill = require('./bill');

// * Define user db model
class User extends Model {
    static get tableName () {
        return 'users'
    }

    static get relationMappings () {
        return {
            bills: {
                relation: Model.HasManyRelation,
                modelClass: Bill,
                join: {
                    from: 'users.id',
                    to: 'bills.user_id'
                }
            }
        }
    }
}

module.exports = User;