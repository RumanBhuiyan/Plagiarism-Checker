const fs = require("fs");
const express = require("express");
const app = express();
const jsdiff = require("diff");
const textract = require("textract");
const searchEngine = require("got");
const cheerio = require("cheerio");
const queryString = require("query-string");
const voca = require("voca");
const isImageUrl = require("is-image-url");
const FileReader = require("filereader");
require("dotenv").config();

//using bodyParser to receive requser body information
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //if you dont use it then req.body will be {} empty

//cors enabling so that client requests dont be rejected by server
const cors = require("cors");
app.use(cors());

//Handing Files in node js
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//packages for reading docx and pdf files
const mammoth = require("mammoth");
const pdf = require("pdf-parse");
const { encode } = require("punycode");
const { TextDecoder } = require("util");

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
  try {
    pdf(req.files.file.data)
      .then((data) => {
        res.send(data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.send(error);
  }
});

app.post("/txt", (req, res) => {
  //reads text files for error!!
  try {
    let textFileData = fs.readFileSync(
      Buffer.from(req.files.file.data),
      "utf-8"
    );
    res.send(textFileData);
  } catch (error) {
    res.send(error.path);
  }
});

app.post("/diffwords", (req, res) => {
  let diffResult = jsdiff.diffWords(req.body.content1, req.body.content2);
  let copiedpart = "";
  for (let i = 0; i < diffResult.length; i++) {
    if (Object.keys(diffResult[i]).length === 2) {
      copiedpart += diffResult[i].value;
    } else {
      copiedpart += "..";
    }
  }
  res.send(copiedpart);
});

let myLinks = [];
app.get("/googleresponse", (req, response) => {
  myLinks = [];
  let searchingItem = `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${req.query.text}`;

  searchEngine(searchingItem)
    .then((res) => {
      let engineResponse = JSON.parse(res.body);
      let items = engineResponse.items;
      for (let i = 0; i < items.length; i++) {
        myLinks.push(items[i].link);
      }
      myLinks.push(req.query.text);
    })
    .catch((error) => {
      console.log(error);
    });
  response.send("Data Fetched And Assigned Successfully");
});

app.get("/getlinks", (req, res) => {
  res.send(myLinks);
});

app.get("/searchonline", (req, res) => {
  const { searchingLink, searchingText } = req.query;
  let sendingString = "";
  textract.fromUrl(searchingLink, (error, text) => {
    if (error) {
      console.log(error);
    } else {
      if (text.includes(searchingText)) {
        sendingString = "Copied 100% : " + searchingText;
        res.send(sendingString);
      } else {
        let diffResult = jsdiff.diffWords(searchingText, text);
        let copiedpart = "";
        for (let i = 0; i < diffResult.length; i++) {
          if (Object.keys(diffResult[i]).length === 2) {
            copiedpart += diffResult[i].value;
          }
        }
        let similarity =
          (
            voca.words(copiedpart).length / voca.words(searchingText).length
          ).toFixed(4) * 100;
        sendingString = "Copied " + similarity + "% " + copiedpart;
        res.send(sendingString);
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
