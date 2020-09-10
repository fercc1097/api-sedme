const passport = require('passport');
import {getOneUser} from '../controllers/user.controller';

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    (getOneUser())
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
  });

};