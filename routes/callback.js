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
        // console.log(req.query.id);

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
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err,
                });
            });

        if (access_token) {
            const user_info_url = `https://api.linkedin.com/v2/userinfo`;
            const res_user_info = await axios
                .get(user_info_url, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const user_info = response.data;

                    if (user_info) {
                        const LinkedinID = user_info.sub;
                        const name = user_info.name;
                        const email = user_info.email;
                        const picture = user_info.picture
                            ? user_info.picture
                            : "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg";

              

                        const token = jwt.sign(
                            { LinkedinID: LinkedinID, name: name, email: email, picture: picture },
                            process.env.JWT_SECRET
                        );

             
                        // res.redirect(`http://127.0.0.1:5173/home?token=${token}`);
                    } else {
              
                        console.log("User info not found");
                        res.status(500).json({
                            message: "User info not found",
                        });
                    }
                })
                .catch((err) => {
                    console.log("ERROR: ", err);
                    res.status(500).json({
                        message: "Internal Server Error",
                        error: err,
                    });
                });
        } else {
            console.log("access_token not found");
            res.status(500).json({
                message: "Access token not found",
            });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
});


 module.exports = router;