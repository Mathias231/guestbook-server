import passport from 'passport';
import userModel, { IUser } from '../models/user.model';
import localStrategy from './strategies/localStrat';

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  userModel.findOne({
    _id: userId,
  });
});

passport.use(localStrategy);
