const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  food: { type: String, required: true },
  feedTime: Date,
  location: { type: String },
  country: { type: String, required: true },
  duckCount: { type: Number, required: true },
  foodType: String,
  foodAmount: Number,
});

mongoose.model("Input", inputSchema);
