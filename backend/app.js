require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
require("./config/db-connection");

const config = require("./config/config");

const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const passport = require("passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  expressSession({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

const users_route = require("./routes/user");

app.use("/user", users_route);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`\nServer Started on ${port}`);
});
