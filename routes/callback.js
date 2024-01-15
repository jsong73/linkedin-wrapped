const router = require("express").Router();
const passport = require("passport")
const axios = require("axios");
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
        // here we get this code from passport linkedin strategy.
        const code = req.query.code;
        console.log("code--> ", code);

        const redirect_uri = `${process.env.LINKEDIN_REDIRECT_URI}`;
        var access_token;

        // step 2: access token retrieval
        const access_token_url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`;
        const res_token = await axios
            .post(access_token_url)
            .then((res) => {
                access_token = res.data.access_token;
            })
            .catch((err) => {
                console.log(err);
            });

        // console.log("access_token--> ",access_token);

        // step 3: Fetching User Data
        const user_info_url = `https://api.linkedin.com/v2/userinfo`;
        if (access_token) {
            const res_user_info = await axios
                .get(user_info_url, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    user_info = response.data;
                    // res.send(res.data);
                })
                .catch((err) => {
                    console.log("ERROR: ", err);
                });
        } else {
            console.log("access_token not found");
        }

        // step 4: Storing User Data
        if (user_info) {
            user_info1 = user_info;

            const LinkedinID = user_info.sub;
            const name = user_info.name;
            const email = user_info.email;
            const picture = user_info.picture
                ? user_info.picture
                : "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg";

            // code to store user information to the database
        } else {
            user_info1 = results[0];
            console.log("user found",user_info1);
        }

        // step 5: Generating JWT Token
        const token = jwt.sign(
            { LinkedinID: LinkedinID, name: name, email: email, picture: picture },
            process.env.JWT_SECRET
        );

        // step 6: this will redirect the user to the home page after successful login/authentication
        res.redirect(`http://127.0.0.1:5173/home?token=${token}`);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
});

   module.exports = router;