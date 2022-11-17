import userModel from '../../models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// Setting up local login strategy
const localStrategy = new LocalStrategy(function (username, password, done) {
  // Looking for username in DB
  userModel.findOne({ username: username }, (err: Error, user: any) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // Compare password with hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
});

export default localStrategy;
