# GUIDE

This is an express api to takes in user data and save in database for research purpose on ducks.

## Table of Contents

1. [Endpoints](#endpoints)

2. [RunLocally](#RunLocally)

## EndPoints

1. `/data` POST

   This is the only post route. the schema of req body is the following

   ```
   food: String, required
   feedTime: Date
   location: String, required
   country: String, required
   duckCount: Number, required
   foodType: String,
   foodAmount: Number (grams)
   email: String, unique
   ```

   the data is saved in input collection (data collection in mongodb). However if valid email is provided it will also be saved in scheduled data base.

   this repo also contains a standalone function which is meant to run periodicaly to push all the copy all the data from scheduled collection to input collection.

2. `/data` GET

   This will send back all the data.

3. `/paginated-data/:page/:perpage` GET

   This will send back data based on page and perpage value

4. `/popular-food` GET

   This is a return data grouped by unique food name

5. `/data-by-country` GET

   This will return data grouped by unique country name

### Run Locally

1. Clone the repository
2. Add a .env file and create a variable MONGO_URI and give it a mongodb url.
3. in your terminal run `yarn`
4. to start the server `node index.js`
5. to run test `yarn test`
6. to run schedular function `node Schedular/schedular.js`
