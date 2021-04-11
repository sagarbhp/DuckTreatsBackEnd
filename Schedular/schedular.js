/*This a function that will run timely each day to push scheduled documents from
 ** mongodb schuled collection to input collection */

const mongoose = require("mongoose");
require("../Model/inputModel");
require("../Model/schedularModel");
const { open, close } = require("../setup/dbConfig");

//Creating database models
const Schedule = mongoose.model("Schedule");
const Input = mongoose.model("Input");

const main = async () => {
  //opening database connection
  await open();
  //gettiing all the scheduled documents
  try {
    let scheduledData = await Schedule.find({});
    //removing _id field from scduled documents. This can also be done through a subschema
    let formattedData = scheduledData.map((_, i) => {
      let temp = scheduledData[i].toObject();
      delete temp._id;
      return temp;
    });

    //inputing the formatted data in main collection
    let inputed = await Input.insertMany(formattedData);

    console.log("Successfully inserted data, Count", inputed.length);
  } catch (err) {
    console.log("Schedular has encountered an error", err);
  }

  await close();
};

//Calling main function
main();
