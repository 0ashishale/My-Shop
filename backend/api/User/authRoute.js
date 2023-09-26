// const express = require('express')
// const router = express.Router()

//OR

const router = require('express').Router();

const passport = require('passport')

const {isAuthenticated} = require('../../middleware/auth')

//google auth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//facebook auth
router.get('/auth/facebook', passport.authenticate('facebook'));

// Callback route after Google OAuth completes

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureMessage : 'Cannot Loggin to google. Please try again later.',
    failureRedirect : 'http://localhost:3000/login/fail',
    successRedirect : 'http://localhost:3000/login/success',

  }),

  (req, res) => {
    console.log("User :", req.user)
      res.send(`Thank you for signin`)
      res.json({
        user : req.user
      })
  }
);

//facebook callback
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureMessage : 'Cannot Loggin to Facebook. Please try again later.',
    failureRedirect : 'http://localhost:3000/login/fail',
    successRedirect : 'http://localhost:3000/login/success',

  }),

  (req, res) => {
    console.log("User :", req.user)
      res.send(`Thank you for signin`)
      res.json({
        user : req.user
      })
  }
);




router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred during login.' });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // If authentication is successful, you can log in the user, set a session, or generate a token.
    // For example, if using session-based authentication:
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred during login.' });
      }
      return res.status(200).json({ success: true ,message: 'Login success', user: user });
    });
  })(req, res, next);
});


router.get('/auth/user', isAuthenticated , (req, res)=>{

  res.json({user: req.user });

})

//logout 
router.get('/auth/logout', (req, res)=>{
  try {
    req.logOut();
    res.status(200).json({
      success : true,
      message : `Logout successfully.`
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success : false,
      error : error.message
     })
  }
})

module.exports = router