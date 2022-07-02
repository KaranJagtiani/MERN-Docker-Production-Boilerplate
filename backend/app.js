require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
require("./config/db-connection");

const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`\nServer Started on ${port}`);
});
