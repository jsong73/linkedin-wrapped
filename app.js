const express = require("express");
const passport = require("passport")
const LinkedInOAuth = require("passport-linkedin-oauth2")
const session= require("express-session")
const CONSTANTS = require("./constants")
const app = express();
require("dotenv").config();


const LinkedInStrategy=LinkedInOAuth.Strategy


const LINKEDIN_STRATEGY_OBJECT= {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${CONSTANTS.callbackUrlDomain}:${CONSTANTS.PORT}${CONSTANTS.callbackUrl}`,
    scope: CONSTANTS.linkedInScopes,
  }

  passport.use(
    new LinkedInStrategy(LINKEDIN_STRATEGY_OBJECT,
      (
        accessToken,     
        refreshToken,
        profile,
        done
      ) => {
        console.log('LinkedIn Access Token:', accessToken);
        console.log('LinkedIn User Profile:', profile);
        process.nextTick(() => {
          return done(null, profile);
        });
      }
    )
  );


passport.serializeUser((user, done) => {
    done(null, user)
});


// MIDDLEWARES

// create session
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use (passport.initialize());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(CONSTANTS.authUrl,passport.authenticate(CONSTANTS.strategy, { state: '' }));

app.get(CONSTANTS.callbackUrl,passport.authenticate(CONSTANTS.strategy, {
 successRedirect:CONSTANTS.successUrl,
  failureRedirect:CONSTANTS.failureUrl,
})
);


app.get("/", (req, res) => {
    const user=req.user;
    if (user) {
      const firstName = user.name.givenName;
      const photo = user.photos[0].value;
      res.send(
        `<div style="text-align:center; width:100%; margin: 200px 0px;">
          <h1 style="font-family: sans-serif;"> Hey ${firstName} 👋</h1>
          <p style="font-family: sans-serif;"> You've successfully logged in with your Linkedn Account 👏 </p>
          <img src="${photo}"/>
        </div>
        `
      )
    } else {
      res.send(
      `<div style="text-align:center; width:100%; margin: 200px 0px;"> 
            <h1 style="font-family: sans-serif;">Welcome to LinkedIn OAuth App</h1>
            <img style="cursor:pointer;margin-top:20px"  onclick="window.location='/auth/linkedIn'" src="https://dryfta.com/wp-content/uploads/2017/04/Linkedin-customized-button.png"/>
      </div>
      `);
    }
  });


     
app.listen(CONSTANTS.PORT, () => console.log(`listening on http://localhost:${CONSTANTS.PORT}`))