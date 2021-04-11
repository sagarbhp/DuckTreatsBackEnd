const dotenv = require("dotenv");

dotenv.config();

const dbConfig = require("./setup/dbConfig");
const app = require("./setup/app");

//Server post
const PORT = process.env.PORT || 9000;

const start = async () => {
  await dbConfig.open();
  app.listen(PORT, () => {
    console.log("Started express server on port: ", PORT);
  });
};

start();
