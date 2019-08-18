module.exports = {

    development: {
        host: 'http://localhost',
        port: process.env.PORT || 3000,
        reqDuration: 5184000,
        corsOptions: {
            origin: 'http://localhost:4200',
            credentials: true
        },
        cookieOptions: {
            httpOnly: false, 
            secure: false,
            maxAge: 1000 * 60 * 60,
            signed: false,
            domain: 'localhost'
        },
        csrfCookieOptions: {
            secure: false,
            domain: 'localhost'
        }
    },
    
    production: {
        host: '<production_auth_host>',
        port: process.env.app_port || 8080,
        reqDuration: 2629746000,
        corsOptions: {
            origin: '<production_host>',
            credentials: true
        },
        cookieOptions: {
            httpOnly: true, 
            secure: true,
            maxAge: 1000 * 60 * 60,
            signed: true,
            domain: '<production_domain>'
        },
        csrfCookieOptions: {
            secure: true,
            domain: '<production_domain>'
        }
    }
}