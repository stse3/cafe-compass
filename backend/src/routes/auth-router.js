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
        
        res.redirect(`${process.env.FRONTEND_URL}/profile`);
    }
)

//logout route
authRouter.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if (err){
            console.error('Error logging out: ',err);
            return res.status(500).json({message:'Logout failed'});

        }
        //clear any session cookies
        res.clearCookie('connect.sid');
        //return json instead of redirecting
        res.json({message: 'Logged out succesfully'});
        
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

