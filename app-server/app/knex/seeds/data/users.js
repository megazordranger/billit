const casual = require('casual');

const users = Array(10).fill().map((value, index) => {
    return {
        id: index + 1,
        username: casual.username,
        email: casual.email,
    }
});

module.exports = users;