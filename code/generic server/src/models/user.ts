/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : user.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : User model.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logger from '../diagnostic/logger';
import CONFIG from '../server/config.json';

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: string;
  email_id: string;
  mobile_number: string;
  landline_number: string;
  active: boolean;
  comparePassword(password: string): Promise<boolean>;
  generateJwtToken(): Promise<string>;
}

export const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: 'Enter first name'
  },
  last_name: {
    type: String,
    trim: true,
    required: 'Enter last name'
  },
  email_id: {
    type: String,
    trim: true,
    required: [true, 'Enter email id']
  },
  mobile_number: {
    type: String,
    required: [true, 'Enter mobile number']
  },
  landline_number: {
    type: String,
    maxlength: [15, 'Enter valid landline number'],
    minlength: [8, 'Enter valid landline number'],
    required: [true, 'Enter landline number']
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password should be at least 6 character long'],
    maxlength: [50, 'Password should be at most 50 character long'],
    required: [true, 'Password is required']
  },
  active: {
    type: Boolean,
    default: false
  },
  addresses: [
    {
      addressTypeId: Number,
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      zip_code: String
    }
  ],
  created_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', (next) => {
  logger.debug('Incrypt password...');
  logger.debug(this.password);
  bcrypt.hash(this.password, 8, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.pre('update', (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = (candidatePassword: string): Promise<boolean> => {
  const password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) { return reject(err); }
      return resolve(success);
    });
  });
};

/**
 * Validate password
 */
// schema.methods.comparePassword = (password) => {

//   logger.debug('In validatePassword...');

//   return require('bcryptjs').compareSync(password, this.password);
// };

/**
 * Generate JWT token
 */
UserSchema.methods.generateJwtToken = () => {

  logger.debug('In generateJwtToken...');

  return jwt.sign(
    { id: this._id },
    CONFIG.jwt_token.secret_key,
    { expiresIn: CONFIG.jwt_token.expire_in }
  );
};

// export const model = mongoose.model<IUser>('User', schema);
// export const cleanCollection = () => model.remove({}).exec();
// export default model;

module.exports = mongoose.model('User', UserSchema, 'Users');
