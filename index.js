//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = new express();
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crytoCurrency = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs:  {
      from: crytoCurrency,
      to: fiat,
      amount: amount
    }

  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);

    var price = data.price;
    var currentDate = data.time;

    res.write("<p>The current date is: " + currentDate + "</p>");
    res.write("<h1>" + amount + " " + crytoCurrency +  " is currently " + price + " " + fiat + "</h1>");

    res.send();
  });
});


app.listen(3000,"0.0.0.0", function() {
  console.log("Running on port 3000");
});
