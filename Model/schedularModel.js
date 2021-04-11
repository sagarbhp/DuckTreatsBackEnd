const mongoose = require("mongoose");

const schedularSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  food: { type: String, required: true },
  feedTime: Date,
  location: { type: String },
  country: { type: String, required: true },
  duckCount: { type: Number, required: true },
  foodType: String,
  foodAmount: Number,
});

mongoose.model("Schedule", schedularSchema);
