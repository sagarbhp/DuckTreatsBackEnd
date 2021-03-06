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

publicGetRoutes.get("/data-by-country", async (req, res) => {
  console.log("received request to get data by country from database");
  let output = {};
  try {
    //setting up aggregation pipeline to get data based on country
    let country = await Input.aggregate([
      {
        $group: {
          _id: "$country",
          location: { $addToSet: "$location" },
          count: { $sum: 1 },
          food: { $addToSet: "$food" },
          ducksFed: { $sum: { $add: "$duckCount" } },
        },
      },
      { $sort: { ducksFed: -1 } },
    ]);
    output.data = country;
    //counting the total number of document
    let count = await Input.countDocuments({});
    output.total = count;
    res.status(200).send(output);
  } catch (err) {
    console.log("Encountered error in /data-by-country", err);
    res.status(500).send({ message: err.message });
  }
});

publicGetRoutes.get("/data", async (req, res) => {
  console.log("received request to get all data");

  try {
    let data = await Input.find({});
    res.status(200).send(data);
    console.log("successfully completed /data request");
  } catch (err) {
    console.log("Encountered Error in /data path", err);
    res.status(500).send({ message: err.message });
  }
});

publicGetRoutes.get("/paginated-data/:page/:perpage", async (req, res) => {
  console.log("received request to get paginated data");
  const limit = 2000;
  let { page, perpage } = req.params;
  let skip = 0;
  let output = {};
  try {
    page = parseInt(page);
    perpage = parseInt(perpage);

    if (perpage > limit) {
      perpage = limit;
    }

    if (page < 1) {
      page = 1;
    }
    skip = (page - 1) * perpage;

    let data = await Input.aggregate([
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: perpage },
    ]);
    output.data = data;
    //counting the total number of documents
    let count = await Input.countDocuments({});
    output.total = count;
    res.status(200).send(output);
    console.log("successfully completed /paginated-data request");
  } catch (err) {
    console.log("Encountered error in /paginated-data path", err);
    res.status(500).sendStatus({ message: err.message });
  }
});

module.exports = publicGetRoutes;
