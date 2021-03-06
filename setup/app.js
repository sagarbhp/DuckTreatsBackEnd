//App is the file where express server is configured

//---------------------- imports--------------/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Models
require("../Model/inputModel");
require("../Model/schedularModel");

//Routes
const publicPostRoutes = require("../Routes/publicPostRoutes");
const publicGetRoutes = require("../Routes/publicGetRoutes");

//------------------------ Server Config -----/
const app = express();
app.use(express.json());
app.use(cors());

app.use(publicPostRoutes);
app.use(publicGetRoutes);

//------------------------- Health Route ------/
app.get("/", (req, res) => {
  res.status(200).send("Hello Ducks!");
});

module.exports = app;
