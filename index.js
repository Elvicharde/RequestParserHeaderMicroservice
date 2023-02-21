// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// the /api/whoami endpoint
app.get("/api/whoami", Handler).post("/api/whoami", Handler)

function Handler(req, res){
  let headerInfo = req.rawHeaders;
  // required headers
  let host  = headerInfo[headerInfo.indexOf("X-Forwarded-For") + 1]
  let language = headerInfo[headerInfo.indexOf("Accept-Language") + 1]
  let userAgent = headerInfo[headerInfo.indexOf("User-Agent") + 1]

  respObj = {ipaddress: host, language: language, software: userAgent}

  console.log(respObj)
  res.json(respObj);    // send the response  
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
