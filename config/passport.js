const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require("../models/user");

//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    let user = await UserModel.findOne({googleId: profile.id});

    if (user) return cb(null, user)
    try {
      user = await UserModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      })
      cb(null, user) // pass the created user to next place in the middleware chain
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id)
});

passport.deserializeUser(async function(id, cb) {
  try{
    const userDoc = await UserModel.findById(userId)
    cb(null, userDoc)
    // req.user = esrDoc
  } catch(err) {
    cb(err)
  }
});



