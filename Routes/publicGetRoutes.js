const express = require("express");
const mongoose = require("mongoose");

//----------------------- Set Up ----------------------------------------------
const publicGetRoutes = express.Router();
const Input = mongoose.model("Input");

publicGetRoutes.get("/popular-food", async (req, res) => {
  console.log("received request get data from database");
  let output = {};
  try {
    //Setting up aggregation pipeline to group data based on food
    let food = await Input.aggregate([
      {
        $group: {
          _id: "$food",
          count: { $sum: 1 },
          country: { $addToSet: "$country" },
          ducksFed: { $sum: { $add: "$duckCount" } },
        },
      },
      { $sort: { count: -1 } },
    ]);
    output.data = food;
    //counting the total number of documents
    let count = await Input.countDocuments({});
    output.total = count;
    res.status(200).send(output);
  } catch (err) {
    console.log("Encountered error in /popular-food:", err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = publicGetRoutes;
