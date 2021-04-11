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
  //output is the object that will be returned upon successful completion of process
  let output = { message: "Successfully saved data!" };

  //processing input data to standardize form
  let [data, err] = processInputData(req.body);

  if (err) {
    console.log("Encountered error while processing input data");
    return res.status(400).send({ message: err.message });
  }

  if (data.email != "nil" && emailValidator(data.email)) {
    //Setup schedular for this input data
    console.log("found email address in input. Saving scheduled data");

    try {
      let schedule = new Schedule(data);
      await schedule.save();
      output.schedularID = schedule._id;
    } catch (err) {
      console.log("Encountered error while savaing scheduled data", err);
      output.message = "Response was saved but failed to set up schedular!";
    }
  }
  try {
    let input = new Input(data);
    await input.save();
    console.log("Successfully saved input document in database");
    output.inputID = input._id;
    res.status(201).send(output);
  } catch (err) {
    console.log("Error occoured while saving data in database: ", err);
    res.status(500).send(err);
  }
});

module.exports = publicPostRoutes;
