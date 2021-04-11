const express = require("express");
const mongoose = require("mongoose");

//----------------------- Set Up ----------------------------------------------
const publicGetRoutes = express.Router();
const Input = mongoose.model("Input");

publicGetRoutes.get("/popular-food", async (req, res) => {
  console.log("received request get data from database");
  res.status(300).send("Error");
});

module.exports = publicGetRoutes;
