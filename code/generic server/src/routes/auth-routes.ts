import * as express from 'express';
import * as passport from 'passport';

import { Constants } from '../utilities';

const router = express.Router();

router.post('/login', (req, res) => {

  passport.authenticate(Constants.authType.BASIC, (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    if (!req.body.username || !req.body.password) {
      return res.status(401).send('Username & password is required!');
    }
    if (!user) {
      return res.status(401).send('No user found.');
    }
    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send('Password is incorrect!');
    }
    res.json({ auth: true, user_id: user._id, token: user.generateJwtToken() });
  })(req, res);
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
