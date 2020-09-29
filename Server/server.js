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

app.post("/searchonline", (req, response) => {
  let searchItem = `https://www.google.com/search?q=${req.body.text}`;
  let sentItems = [];

  searchEngine(searchItem)
    .then((res) => {
      let $ = cheerio.load(res.body);
      let allAnchorTags = $("a");
      let extractedLinks = [];
      for (let i = 0; i < allAnchorTags.length; i++) {
        let keep = queryString.parse(allAnchorTags[i].attribs.href);
        let link = Object.values(keep)[0];
        if (link !== null && link.includes("https")) {
          extractedLinks.push(link);
        }
      }
      // Removing same links
      let finalLinks = extractedLinks.filter((item, index) => {
        return extractedLinks.indexOf(item) === index;
      });
      //Scaning results from Google and assigning to sentItems[]
      for (let i = 0; i < 10; i++) {
        try {
          if (!isImageUrl(finalLinks[i])) {
            setTimeout(() => {
              textract.fromUrl(finalLinks[i], (error, text) => {
                if (error) {
                  console.log(error);
                } else {
                  if (text.length !== 0 && text.includes(req.body.text)) {
                    let object = {
                      content: req.body.text,
                      link: finalLinks[i],
                      copied: req.body.text,
                    };
                    sentItems.push(object);
                    console.log(object);
                  } else {
                    let diffResults = jsdiff.diffWords(req.body.text, text);
                    let copiedpart = "";
                    for (let i = 0; i < diffResults.length; i++) {
                      if (Object.keys(diffResults[i]).length === 2) {
                        copiedpart += diffResults[i].value;
                      }
                    }
                    let object = {
                      content: req.body.text,
                      link: finalLinks[i],
                      copied: copiedpart,
                    };
                    sentItems.push(object);
                    console.log(object);
                  }
                }
              });
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setTimeout(() => {
        response.send(sentItems);
      }, 300000);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
