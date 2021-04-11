const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ducks";

exports.open = async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(MONGO_URI, mongooseOpts);
  console.log("Connected to MongoDB at: ", MONGO_URI);
};

exports.close = async () => {
  await mongoose.disconnect();
};
