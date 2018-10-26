import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import logger from '../diagnostic/logger';
import { Config } from '../server/config';

const { Schema } = mongoose;

export const UserSchema = new Schema({
    first_name: {
        type: String,
        required: 'Enter a first name'
    },
    last_name: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required: 'Enter email id'
    },
    company: {
        type: String
    },
    phone: {
        type: Number,
        required: 'Enter phone number'
    },
    username: {
        type: String,
        required: 'Username required'
    },
    password: {
        type: String,
        required: 'Password required'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validate password
 */
UserSchema.methods.validatePassword = function(password) {
    logger.debug('In validatePassword...');
    return require('bcryptjs').compareSync(password, this.password);
};

/**
 * Generate JWT token
 */
UserSchema.methods.generateJwtToken = function() {
    logger.debug('In generateJwtToken...');

    return jwt.sign(
        { id: this._id },
        Config.JWT_TOKEN.secret_key,
        { expiresIn: Config.JWT_TOKEN.expire_in }
    );
};
