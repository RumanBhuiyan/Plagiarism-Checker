const fs = require("fs");
const express = require("express");
const app = express();
const jsdiff = require("diff");

//using bodyParser to receive requser body information
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors enabling so that client requests dont be rejected by server
const cors = require("cors");
app.use(cors());

//Handing Files in node js
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//packages for reading docx and pdf files
const mammoth = require("mammoth");
const pdf = require("pdf-parse");

app.post("/docx", (req, res) => {
  //Receive the buffer from req.files.file.data & pass it in mammoth
  mammoth
    .extractRawText({ buffer: req.files.file.data })
    .then(function (result) {
      res.send(result.value);
    })
    .done();
});

app.post("/pdf", (req, res) => {
  //Receive the buffer from req.files.file.data & pass it inside pdf
  pdf(req.files.file.data)
    .then((data) => {
      res.send(data.text);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/diffwords", (req, res) => {
  let diffResult = jsdiff.diffWords(req.body.content1, req.body.content2);
  let copiedpart = "";
  for (let i = 0; i < diffResult.length; i++) {
    if (Object.keys(diffResult[i]).length === 2) {
      copiedpart += diffResult[i].value;
    }
  }
  res.send(copiedpart);
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
