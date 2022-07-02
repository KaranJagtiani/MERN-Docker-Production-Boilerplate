require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
require("./config/db-connection");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`\nServer Started on ${port}`);
});
