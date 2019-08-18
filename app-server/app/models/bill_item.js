const { Model } = require('objection');
const Bill = require('./bill');

// * Define bill items db model
class BillItem extends Model {
	static get tableName () {
		return 'bill_items'
	}

	static get relationMappings () {
		return {
			bill: {
				relation: Model.BelongsToOneRelation,
				modelClass: Bill,
				join: {
					from: 'bill_items.bill_id',
					to: 'bills.id'
				}
			}
		}
	}
}

module.exports = BillItem;