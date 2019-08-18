const casual = require('casual');

const billItems = Array(500).fill().map((value, index) => {
    return {
        id: index + 1,
        bill_id: casual.integer(1, 50),
        name: casual.word,
        price: casual.double(0, 10000),
        tax: casual.double(0, 100),
    }
});

module.exports = billItems;
