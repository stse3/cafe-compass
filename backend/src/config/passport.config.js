const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService  = require('../services/user-service');
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  //check if user exists, if not then store into DB
  (async () => {
    try {
      console.log("checking if the user is in the database")
      const googleId = profile.id;
      const name =profile.displayName;
      const email=profile.emails[0].value;
      const photoUrl = profile.photos?.[0]?.value || null;

      let user = await userService.getUserByGoogleId(googleId);
      
      if (!user){
        user = await userService.addUser(name, email, photoUrl,googleId);
        console.log("succesfully added user!");
      }
      return done (null,{
        id: user.id,
        name: user.name,
        email: user.email,
        google_id: googleId
      });
    }catch (err){
      console.error('Error during Google authentication, ', err)
      return done(err,null);
    }

  }) (); //dont forget (), this invokes the function

}));