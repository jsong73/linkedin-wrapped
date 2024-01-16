const router = require("express").Router();
const passport = require("passport")
const axios = require('axios');
const jwt = require("jsonwebtoken");
require("dotenv").config()

router.get(
    "/linkedin",
    passport.authenticate("linkedin", {
        state: "some",
        passReqToCallback: true,
}),
    (req, res) => {}
)

router.get("/linkedin/callback", async (req, res) => {
    try {
        console.log(req.query.id);

        const code = req.query.code;
        console.log("code--> ", code);

        let access_token;

        const access_token_url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`;
        const res_token = await axios
            .post(access_token_url)
            .then((res) => {
                access_token = res.data.access_token;
                console.log("access_token--> ", access_token);
            })
            .catch((err) => {
                console.log(err);
            });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    
    }
});


   module.exports = router;