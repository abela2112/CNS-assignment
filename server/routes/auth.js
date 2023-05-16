const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../model/user");
function hashPassword(password) {
  const hash = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, hash);
}
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please provide a valid email and password");
    }
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("no user found");
    const isMatch = user.comparePassword(password);
    if (!isMatch) throw new Error("incorrect password");
    const token = user.createJwt();

    res
      .cookie("token", token)
      .json({ success: true, message: "successfully signed in", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newHashPassword = hashPassword(password);
    const user = new User({ email, password: newHashPassword, name });
    await user.save();
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});
module.exports = router;
