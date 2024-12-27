const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Employee = require("./models/employee");

mongoose.connect("mongodb://127.0.0.1:27017/company");
const port = 3000;

app.set("view engine", "ejs");

const getrandom = (arr) => {
  let rno = Math.floor(Math.random()* (arr.length-1))
  return arr[rno]
}

app.get("/", (req, res) => {
  res.render("index", { foo: "FOO" });
});
app.get("/generate", async(req, res) => {
  //clear the collection employee
  await Employee.deleteMany({})
  //generate random data
  let randomnames = ["rohan", "soham", "mohan", "sobham"]
  let randomlang = ["python", "js", "c++", "java"]
  let randomcities = ["bilaspur", "moradabad", "mysore", "kolkata"]
  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getrandom(randomnames),
      salary: Math.floor(Math.random()* 22000),
      language: getrandom(randomlang),
      city: getrandom(randomcities),
      isManager: (Math.random()>0.5)?true:false
    })
    console.log(e)
  }
  res.render("index", { foo: "FOO" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
