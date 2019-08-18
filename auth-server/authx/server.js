require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const express = require('express');
const expressEnforcesSsl = require('express-enforces-ssl');
const helmet = require('helmet');
const morgan = require('morgan');
const requestIp = require('request-ip');

// * Getting the execution environment
const environment = process.env.NODE_ENV;
// * String used for signing cookies
const secret = process.env.SECRET;
// * Getting configuration variables
const { host, port, reqDuration, corsOptions, csrfCookieOptions } = require('./config')[environment];

// * Initializing express
const app = express();
// * Configuring csrf protection
const csrfProtection = csrf({
    cookie: {
        key: '_auth_csrf',
        ...csrfCookieOptions
    }
});

// * MIDDLEWARES

// * Cookie middleware
app.use(cookieParser(secret));
// * Cors middleware
app.use(cors(corsOptions));
// * Security middleware
app.use(helmet());
app.use(helmet.hsts({
    maxAge: reqDuration
}));
// * Middleware for getting IP from request
app.use(requestIp.mw());

if (environment === 'production') {
    // * Configuration for getting IP
    app.enable('trust proxy');
    // * Force SSL conections middleware
    app.use(expressEnforcesSsl());
    // * Security middleware
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            childSrc: ["'none'"],
            objectSrc: ["'none'"],
            formAction: ["'none'"]
        }
    }));
} else {
    // * Request logger middleware
    app.use(morgan('dev'));
}

// * Route for generate csrf token
app.get('/', csrfProtection, (req, res) => {
     // * Pass the Csrf Token
    res.cookie('XSRF-AUTH-TOKEN', req.csrfToken(), csrfCookieOptions);
    res.send({});
});
// * Apliying csrf token validation to all post routes
app.post('*', csrfProtection);

// * Importing apollo properties configuration
const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const directives = require('./directives');

// ! Removing buggie directive until the autor fixed it
delete directives.constraint;

// * Creating apollo server
const server = new ApolloServer({
    typeDefs: schema,
    schemaDirectives: directives,
    resolvers,
    cors: cors(corsOptions),
    context: ({ req, res })  => ({
        models,
        res,
        clientIp: req.clientIp
    }),
    uploads: false,
});

// * Apliying express middlewares and cors configuration to apollo server 
server.applyMiddleware({ app, cors: corsOptions });

// * Initializing server
app.listen({ port }, () => {
    console.log(`Apollo Server on ${host}:${port}/graphql`);
});