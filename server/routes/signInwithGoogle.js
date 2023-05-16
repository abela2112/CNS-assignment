const express = require("express");
const router = express.Router();
const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const User = require("../model/user");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(403).json("invalid credentials");
}
async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

router.post("/auth/google", async (req, res) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const { name, email } = profile;
      let user = await User.findOne({ email: email });
      if (!user) {
        user = await User.create({ email, name });
      }
      const token = user.createJwt();
      res
        .status(200)
        .cookie("token", token)
        .json({ success: true, data: { name, email } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured. Registration failed.",
    });
  }
});

module.exports = router;
