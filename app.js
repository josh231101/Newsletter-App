//jshiny esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const mail = req.body.email;

  const data = {
    members : [
      {
        email_address : mail,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  }
  //TURN DATA TO FLAT PACK json
  var jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/c32a7c35bd";
  const options = {
    method: "POST",
    auth: "angela1:df9ac4be27a0557d8a407311bdcbdc09-us10"
  }

  const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.send(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(data);
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
});

//API key
//9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc
//df9ac4be27a0557d8a407311bdcbdc09-us10
//df9ac4be27a0557d8a407311bdcbdc09-us10

//ID LSIT TO PUT THE USER IN OUR list
//c32a7c35bd
