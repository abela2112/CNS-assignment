const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) throw new Error(`Invalid user please sign in `);
    const { userId, email } = jwt.verify(token, "mysecret");
    req.userId = userId;
    req.email = email;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = authorize;
