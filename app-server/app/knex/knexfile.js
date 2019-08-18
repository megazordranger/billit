
module.exports = {

    development: {
        client: 'pg',
        connection: {
            host : 'bnkojktuinmg60x6a7bl-postgresql.services.clever-cloud.com',
            user : 'ueliarjyz8j101rcygum',
            password : 'qYl57GTfDuOpI8gVwYPx',
            database : 'bnkojktuinmg60x6a7bl'
        },
        migrations: {
            directory: `${__dirname}\\migrations`
        },
    },

    production: {
        client: 'pg',
        connection: {
            host : 'bnkojktuinmg60x6a7bl-postgresql.services.clever-cloud.com',
            user : 'ueliarjyz8j101rcygum',
            password : 'qYl57GTfDuOpI8gVwYPx',
            database : 'bnkojktuinmg60x6a7bl'
        },
        migrations: {
            directory: `${__dirname}\\migrations`
        },
    }
};