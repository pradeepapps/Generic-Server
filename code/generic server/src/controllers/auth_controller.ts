import { Request, Response } from 'express';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import PassportHttp from 'passport-http';
import mongoose from 'mongoose';

import { UserSchema } from '../models/user';
import config from '../server/config.json';
import { Constants } from '../shared';
import utility from '../shared/utility';
import logger from '../diagnostic/logger';

const User = mongoose.model('User', UserSchema);

class AuthController {

  /**
   * Initialize passport Basic & Jwt strategy.
   */
  public initialize() {

    logger.debug('AuthController initialize...');

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user1) => {
        done(err, user1);
      });
    });

    // Basic authentication
    passport.use(new PassportHttp.BasicStrategy({ passReqToCallback: true }, (req, username, password, done) => {

      logger.debug('Aunthenticate login user...');

      req.body.username = username;
      User.findOne({ username: username }, (err, user) => {
        req.body.password = password;
        return done(err, user);
      });
    }));

    // Verify JWT token.
    const jwtOption: any = {};
    const JwtStrategy = PassportJwt.Strategy;
    const ExtractJwt = PassportJwt.ExtractJwt;
    jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOption.secretOrKey = config.jwt_token.secret_key;
    jwtOption.algorithms = config.jwt_token.algorithm[0];
    jwtOption.ignoreExpiration = config.jwt_token.token_ignore_expiry;
    jwtOption.passReqToCallback = true;

    passport.use(new JwtStrategy(jwtOption, (req, jwtPayload, callback) => {

      logger.debug('Aunthenticate token...');

      User.findOne({ _id: jwtPayload.id }, (err, user) => {
        if (err) {
          return callback(err, false);
        } else if (user) {
          return callback(null, user);
        } else {
          return callback(null, false);
        }
      });
    }));
  }

  /**
   * User login.
   * @param req Request object.
   * @param res Response object.
   */
  public loginUser(req: Request, res: Response) {

    logger.debug('In loginUser...');

    passport.authenticate(Constants.authType.BASIC, (err, user, info) => {
      if (err) {
        logger.error(err.stack);
        utility.sendResponse(res, Constants.statusCode.INTERNAL_SERVER_ERROR, {
          error: Constants.msg.SERVER_ERROR
        });
      } else if (!req.body.username || !req.body.password) {
        utility.sendResponse(res, Constants.statusCode.UNAUTHORIZED, {
          error: Constants.msg.LOGIN_CREDENTIAL_REQUIRED
        });
      } else if (!user) {
        utility.sendResponse(res, Constants.statusCode.UNAUTHORIZED, {
          error: Constants.msg.INVALID_USERNAME
        });
      } else if (!user.validatePassword(req.body.password)) {
        utility.sendResponse(res, Constants.statusCode.UNAUTHORIZED, {
          error: Constants.msg.INVALID_PASSWORD
        });
      } else {
        utility.sendResponse(res, Constants.statusCode.OK, {
          user_id: user._id,
          token: user.generateJwtToken()
        });
      }
    })(req, res);
  }
}

export default new AuthController();
