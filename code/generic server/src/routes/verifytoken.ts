import * as jwt from 'jsonwebtoken';
import { Config } from '../server/config';

/**
 * Verify token.
 * @param req Request object.
 * @param res Response object.
 * @param next Send to next route end
 */
function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, Config.JWT_TOKEN.secret_key, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.user_id = decoded.id;
        next();
    });
}

module.exports = verifyToken;
