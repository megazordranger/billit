const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// * JWT expiration time
const exp =  parseInt(process.env.JWT_EXP, 10);
// * JWT private key for signing tokens
const key = fs.readFileSync('./sigsso_private.key');
// * String for decript JWT private key
const passphrase = process.env.PASSPHRASE; 
// * Password hashing salt round 
const saltingRounds = parseInt(process.env.SALTING_ROUNDS, 10);

const { Schema } = mongoose;
// * Mongoose user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 150,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 150,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    hash: {
        type: String,
    }
}, 
{ 
    timestamps: true,
    writeConcern: {
        w: 1,
        j: true,
    } 
});


/**
 * class for method definition of user schema
 *
 * @class UserClass
 */
class UserClass {

    /**
     * Method for get user data
     *
     * @readonly
     * @memberof UserClass
     */
    get data() {
        return {
            id: this._id.toHexString(),
            username: this.username,
            email: this.email,
        }
    }

    /**
     * Method for generate password hash
     *
     * @param {string} password - user password
     * @memberof UserClass
     */
    async generatePasswordHash(password) {
        const salt = await bcrypt.genSalt(saltingRounds);
        this.hash = await bcrypt.hash(password, salt);
    }

    /**
     * Method for password validation
     *
     * @param {string} password - user password
     * @returns {string}
     * @memberof UserClass
     */
    async validatePassword(password) {
        const result = await bcrypt.compare(password, this.hash);
        return result;
    }

    /**
     * Method for JWT ganeration
     *
     * @returns {object}
     * @memberof UserClass
     */
    generateJwt() {
        const expiry = new Date();

        const payload = {
            _id: this._id,
            username: this.username,
            email: this.email,
            exp:  (expiry.getTime() / 1000) + exp,
        };

        const privateKey = {
            key,
            passphrase,
        };

        const signOptions = {
            algorithm: 'RS256',
            subject: JSON.stringify(this._id),
        };

        return { 
            token: jwt.sign(payload, privateKey, signOptions),
            expiresIn: payload.exp
        }
    }
}

// * Adding findOrCreate method to mongoose
userSchema.plugin(findOrCreate);
userSchema.loadClass(UserClass);
module.exports = mongoose.model('User', userSchema);