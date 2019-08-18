const { Model } = require('objection');
const User = require('./user');
const BillItem = require('./bill_item');

// * Define bill db model
class Bill extends Model {
	static get tableName () {
		return 'bills'
	}

	static get relationMappings () {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'bills.user_id',
					to: 'users.id'
				}
			},
			items: {
				relation: Model.HasManyRelation,
				modelClass: BillItem,
				join: {
					from: 'bills.id',
					to: 'bill_items.bill_id'
				}
			}
		}
	}
}

module.exports = Bill;