// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isNumeric(str) {
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
// your first API endpoint... 


app.get("/api/:date", function (req, res) {
	console.log(req.params.date)
	  // Date is defined
	  let date;
	  try {
		  // At first check if it is a valid date timestamp string
		  if(isNumeric(req.params.date)){
			  date = new Date(parseInt(req.params.date))
		  }
		  else{
			date = new Date(req.params.date)
		  }
		  
		  if(date.toString() === "Invalid Date"){
			  return res.send({ error : "Invalid Date" })
		  }
		  const unix = date.getTime()
		  res.send({
			  unix : unix,
			  utc : date.toUTCString()
		  })
	  }
	  catch(e){
		  console.log(e)
		  res.send({ error : "Invalid Date" })
	  }
});
app.get('/api', function(req, res){
	date = new Date()
	console.log(req.headers)
	  res.send({
		  unix : date.getTime() * 1000,
		  utc : date.toUTCString()
	  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
