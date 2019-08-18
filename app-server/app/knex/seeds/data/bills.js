const casual = require('casual');

const bills = Array(50).fill().map((value, index) => {
    return {
        id: index + 1,
        user_id: casual.integer(1, 10),
        customer: casual.full_name
    }
});

module.exports = bills;