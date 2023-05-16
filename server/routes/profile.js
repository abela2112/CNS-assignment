const express = require("express");
const router = express.Router();
const User = require("../model/user");
// function isLoggedIn(req, res, next) {
//   ? next() : res.status(403).json("invalid credentials");
// }

router.get("/", async function (req, res) {
  try {
    const { userId, email } = req;

    const user = await User.findById(userId);
    res
      .status(200)
      .json({ success: true, data: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});
router.get("/logout", function (req, res) {
  res
    .cookie("token", "")
    .status(200)
    .json({ success: true, message: "logout successful" });
});
module.exports = router;
