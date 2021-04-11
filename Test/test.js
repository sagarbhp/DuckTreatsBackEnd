//---------------------------------imports
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const { open, close } = require("../setup/testDbConfig");
const app = require("../setup/app");

require("../Model/inputModel");
const input = mongoose.model("Input");

//dummydata to send to mock database during testing
let dummydata = {
  food: "Whatever",
  location: "East",
  country: "West",
  duckCount: 30,
};

//Assertion style
let chaiShould = chai.should();
chai.use(chaiHttp);

describe("API testing with Mocha and Chai", function () {
  //before all tests connecting to mock database
  before(async function () {
    await open();
  });
  //After tests finishes disconnecting from mock database
  after(async function () {
    await close();
  });

  // -------------------------- Test 1: /data (POST) route ----------------------/
  describe("Testing the /data post route without schedular", () => {
    it("Should return an object with  success message and input document id", (done) => {
      chai
        .request(app)
        .post("/data")
        .send(dummydata)
        .end((err, response) => {
          //test on err
          chaiShould.equal(err, null);
          //test on response
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.message.should.exist;
          response.body.inputID.should.exists;
          done();
        });
    });
  });
  //Test 1 with schedular
  describe("Testing the /data post route with schedular", () => {
    it("Should return an object with success message and 2 ID fields", (done) => {
      dummydata.email = "abc@gmail.com";
      chai
        .request(app)
        .post("/data")
        .send(dummydata)
        .end((err, response) => {
          //test on err
          chaiShould.equal(err, null);
          //test on response
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.message.should.equal("Successfully saved data!");
          response.body.inputID.should.exists;
          response.body.schedularID.should.exist;
          done();
        });
    });
  });

  //------------------------- Test 2: /popular-food (GET) route-------------------/
  describe("Testing the /popular-food route", () => {
    it("Should return an object with total and and data field", (done) => {
      chai
        .request(app)
        .get("/popular-food")
        .end((err, response) => {
          //test on err
          chaiShould.equal(err, null);
          //test on response
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.be.a("array");
          response.body.total.should.be.a("number");
          done();
        });
    });
  });
});
