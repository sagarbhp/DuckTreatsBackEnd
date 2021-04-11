const express = require("express");
const mongoose = require("mongoose");
const processInputData = require("../Helper/processInputData");
const emailValidator = require("../Helper/emailValidator");

//----------------------- Set Up ----------------------------------------------

const publicPostRoutes = express.Router();
const Input = mongoose.model("Input");
const Schedule = mongoose.model("Schedule");

publicPostRoutes.post("/data", async (req, res) => {
  console.log("Received post request in /data route");
  res.send("Data Received!");
});

module.exports = publicPostRoutes;
