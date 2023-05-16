const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
//const mongostore = require("connect-mongo").default;

const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const authorize = require("./middleware/authorize");
const routerGoogle = require("./routes/signInwithGoogle");
const encript = require("./routes/encript");
const decript = require("./routes/decript");
const profile = require("./routes/profile");
const app = express();
app.use(express.json());
app.use("/photo", express.static(__dirname + "/public"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routerGoogle);
app.use("/api/auth", auth);
app.use("/api/users", authorize, profile);
app.use("/api/encriptions", authorize, encript);
app.use("/api/decriptions", authorize, decript);
const start = async () => {
  mongoose
    .connect("mongodb://localhost:27017/USERS")
    .then(() => console.log("connected to database"));

  app.listen(4000, () => {
    console.log("listening on port 4000");
  });
};

start();
