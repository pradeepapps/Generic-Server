import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as PassportJwt from 'passport-jwt';
import * as PassportHttp from 'passport-http';
import * as mongoose from 'mongoose';

import { UserSchema } from '../models/user';
import { ApiLimiter } from '../routes/api-rate-limiter';
import { LoggerStream } from '../diagnostic/logger';
import logger from '../diagnostic/logger';
import { Config } from './config';

const User = mongoose.model('User', UserSchema);

export function initialize(app) {

    logger.debug('Initialize middleware...');

    // app.use(app.static(path.join(__dirname, 'public')));

    // parse application/json
    app.use(bodyParser.json({ limit: '50mb' }));

    // support text/plain type post data
    // app.use(bodyParser.text());

    // support application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: false }));

    // app.use(require('cookie-parser')());

    // support http logs
    app.use(morgan('combined', { stream: new LoggerStream() }));

    // API rate limiter
    app.use(ApiLimiter.DEFAULT);

    // app.use(require('express-session')({
    //     secret: 'keyboard cat',
    //     resave: true,
    //     saveUninitialized: true
    // }));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user1) => {
        done(err, user1);
      });
    });

    // HTTP Basic authentication strategy
    passport.use(new PassportHttp.BasicStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        req.body.username = username;
        User.findOne({ username: username }, (err, user) => {
            req.body.password = password;
            return done(err, user);
        });
    }));

    // HTTP Digest authentication strategy
    passport.use(new PassportHttp.DigestStrategy({ passReqToCallback: true, qop: 'auth' }, (username, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, user.password);
        });
    }, (params, done) => {
        done(null, true);
    }));

    // HTTP Bearer authentication strategy
    const JwtStrategy = PassportJwt.Strategy;
    const ExtractJwt = PassportJwt.ExtractJwt;
    const jwtOption: any = {};

    jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOption.secretOrKey = Config.JWT_TOKEN.secret_key;
    jwtOption.algorithms = Config.JWT_TOKEN.algorithm[0];
    jwtOption.ignoreExpiration = Config.JWT_TOKEN.token_ignore_expiry;
    jwtOption.passReqToCallback = true;
    jwtOption.issuer = Config.JWT_TOKEN.issuer;
    jwtOption.audience = Config.JWT_TOKEN.audience;

    passport.use(new JwtStrategy(jwtOption, (req, jwtPayload, done) => {
        User.findOne({ _id: jwtPayload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            } else if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
