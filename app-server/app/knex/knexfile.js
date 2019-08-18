
module.exports = {

    development: {
        client: 'pg',
        connection: {
            host : 'localhost',
            user : 'postgres',
            password : 'postgres',
            database : 'postgres'
        },
        migrations: {
            directory: `${__dirname}\\migrations`
        },
    },

    production: {
        client: 'pg',
        connection: {
            host : '<production_host>',
            user : '<production_user>',
            password : '<production_password>',
            database : '<production_database>'
        },
        migrations: {
            directory: `${__dirname}\\migrations`
        },
    }
};