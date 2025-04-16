const express = require("express")
const passport = require("passport");
const authRouter = express.Router();

//start google login flow
authRouter.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
);

//handle the callback from Google
authRouter.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/'}),
    (req,res) => {
        //successful login
        res.redirect('/profile');
    }
)

//logout route
authRouter.get('/logout', (req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
});

//current user
authRouter.get('/me', (req,res)=>{
    if (req.isAuthenticated()){
        res.json(req.user);
    }else{
        res.status(401).json({message: 'Not authenticated'});
    }
});

module.exports = authRouter;

