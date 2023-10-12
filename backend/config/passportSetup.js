

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../api/User/userModel');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, cb) => {
     

      try {
        const user = await User.findOne({ 'provider.userId': profile.id });

        if (user) {
          console.log(`User already exists`);
          return cb(null, user);
        } else {
          const defaultUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: {
              providerName: profile.provider, // Fixed the property name here
              userId: profile.id,
            },
            avatar: {
              public_id: profile.id,
              url: profile.photos[0].value,
            },
          };

          const newUser = await User.create(defaultUser);
          return cb(null, newUser);
        }
      } catch (error) {
        console.error(error);
        cb(error, null);
      }
    }
  )
);

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/api/auth/facebook/callback"
},
async function(accessToken, refreshToken, profile, cb) {

  
  try {
    const user = await User.findOne({'provider.userId' : profile.id})

    if(user){
    
      cb(null, user)
    }else{
      const defaultUser = {
        name : profile.displayName,
        provider : {
          providerName : profile.provider,
          userId : profile.id
        }
      }

      const newUser = await User.create(defaultUser);
      if(newUser){
        return cb(null, newUser)
      }
      
    }
    
  } catch (error) {
  
   cb(error, null) 
  }
}
));


// Local strategy for traditional login
// passport.use(new LocalStrategy((username, password, done) => {
//   User.findOne({ username: username }, (err, user) => {
//       if (err) return done(err);
//       if (!user || !user.isValidPassword(password)) {
//           return done(null, false, { message: 'Incorrect username or password' });
//       }
//       return done(null, user);
//   });
// }));

passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField : 'password' }, async(username, password, done) => {

    try {
      
      const user = await User.findOne({email : username}).select("+password")
      
 
      if(!user){
         return done(null, false, {message: `Invalid credentials`})
      }

      const isPasswordMatched = await user.comparePassword(password)
 
      if(!isPasswordMatched){
       return done(null, false, {message: `Invalid credentials`})
 
      }


      return done(null, user)
    } catch (error) {
      return done(error, false, null)
    }

    
  })
);

// Middleware to check if user is authenticated
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//       return next();
//   }
//   res.redirect('/login');
// }


// Serialize the user object to save in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user object from the session

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
