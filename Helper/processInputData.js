//Process input data is a function to standardize user input before saving in database
//No type checking is done here because mongoose will handle type checking further down the process.
function processInputData(rawData) {
  let err;
  let formattedData = {
    food: "nil",
    foodType: "nil",
    location: "nil",
    country: "nil",
    duckCount: 0,
    foodAmount: 0,
    email: "nil",
    feedTime: new Date(),
  };

  if (
    !rawData.food ||
    !rawData.country ||
    !rawData.location ||
    !rawData.duckCount
  ) {
    err = new Error("Missing required value in input data");
  }

  for (let key in formattedData) {
    if (rawData[key]) {
      if (typeof rawData[key] === "string") {
        formattedData[key] = rawData[key].toLowerCase().trim();
      } else {
        formattedData[key] = rawData[key];
      }
    }
  }

  return [formattedData, err];
}

module.exports = processInputData;
