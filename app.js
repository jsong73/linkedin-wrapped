const express = require("express");
const passport = require("passport")
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const session= require("express-session")
const CONSTANTS = require("./constants")
const path = require('path');


const callback = require("./routes/callback")
const app = express();
require("dotenv").config();


passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${CONSTANTS.callbackUrlDomain}:${CONSTANTS.PORT}${CONSTANTS.callbackUrl}`,
    scope: CONSTANTS.linkedInScopes,
    state: true
  }, function( accessToken, refreshToken, profile, done){
        req.session.accessToken = accessToken;

        console.log(accessToken)
        process.nextTick( function () {
          return done(null, profile);
        });
}));


passport.serializeUser((user, done) => {
    done(null, user);
  });

passport.deserializeUser((user, done) => {
    done(null, user);
});


// MIDDLEWARES

// create session
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use (passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', callback);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client/dist")));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
  })
  

app.get(CONSTANTS.authUrl,passport.authenticate(CONSTANTS.strategy, { state: '' }));

app.get(CONSTANTS.callbackUrl,passport.authenticate(CONSTANTS.strategy, {
 successRedirect:CONSTANTS.successUrl,
  failureRedirect:CONSTANTS.failureUrl,
})
);



app.listen(CONSTANTS.PORT, () => console.log(`listening on http://localhost:${CONSTANTS.PORT}`))

module.exports = app;