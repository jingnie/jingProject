

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER

const Data = require("./models/post");
mongoose
  .connect(`mongodb://${server}/table1`)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.post("/posts", (req, res, next) => {
  const data = new Data (
    {
      index : req.body

    });
  data.save()
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })
  res.status(201).json({
    message: 'Post added successfully'
  });
});
app.post("/datas", (req, res, next) => {
  const data = new Data (
    {
      index : req.body

    });
  data.save()
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })
  res.status(201).json({
    message: 'Post added successfully'
  });
});



app.get("/posts", (req, res, next) => {
  Data.find().limit(10).then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
  console.log(Data)
});






module.exports = app;
