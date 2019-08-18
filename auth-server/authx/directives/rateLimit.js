const { createRateLimitDirective, defaultKeyGenerator } = require('graphql-rate-limit-directive');
const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');

const mongoConn = mongoose.connection;

/**
 * Rate limiter key generator
 * 
 * * Set the users ID key for limiter 
 */
const keyGenerator = (directiveArgs, obj, args, context, info) => {
    return `${context.clientIp}:${defaultKeyGenerator(
        directiveArgs,
        obj,
        args,
        context,
        info,
    )}`;
}

/**
 * Error handling class for rate limiter directive
 *
 * @class RateLimitError
 * @extends {Error}
 */
class RateLimitError extends Error {
    constructor(msBeforeNextReset) {
        super('Too many requests, please try again shortly.');

        // * Determine when the rate limit will be reset so the client can try again
        const resetAt = new Date();
        resetAt.setTime(resetAt.getTime() + msBeforeNextReset);

        /**
         * GraphQL will automatically use this field to return extensions data in the GraphQLError
         * 
         * @see {@link https://github.com/graphql/graphql-js/pull/928|GitHub}
         */ 
        this.extensions = {
            code: 'RATE_LIMITED',
            resetAt,
        }
    }
}

// * IMPORTANT: Specify how a rate limited field should behave when a limit has been exceeded
const onLimit = resource => {
    throw new RateLimitError(resource.msBeforeNext);
};

module.exports = createRateLimitDirective({
    keyGenerator,
    limiterClass: RateLimiterMongo,
    limiterOptions: {
        storeClient: mongoConn,
    },
    onLimit,
});
