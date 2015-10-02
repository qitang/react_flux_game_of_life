/**
 * Express configuration
 */

'use strict';

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

var bodyParser = require('body-parser');

var GooglePlaces = require('google-places');
var request = require('superagent');
var places = new GooglePlaces('AIzaSyCFRup4O7a-x2TqOzXOtsDnWLUSz36GlkI');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;

// ROUTES
// ==============================================

var secret = {
  client_id : 'ORSKR0AIZN0RB03PAPWN1LUVE3NMAOW44DE4BELTI0HLH2WK',
  client_secret : 'CHHO2A1PUGSOVWRW3YPCBKPP04NACBTDXVHM0W45XAMVT0AW'
};
 
// we'll create our routes here

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});



// home page route (http://localhost:8080)
router.post('/restaurant', function(req, res, next) {
   var place = req.body.name
   var url = 'https://api.foursquare.com/v2/venues/search?near' + place + '&client_id=' + secret.client_id  + '&client_secret=' + secret.client_secret + "&v=20150920";
   request.get(url).end(function(err ,res){
      if(err) {
        next(err)
      } else {
        console.log(res.body.response)
      } 
   })
});

// about page route (http://localhost:8080/about)
router.post('/search', function(req, res) {
  console.log(req.body, '---------')
  places.autocomplete({input: req.body.term, types: "(cities)"}, function(err, response) {
    console.log("autocomplete: ", response.predictions);
    var result = []

    for(var index in response.predictions) {
      result.push({
        ref : response.predictions[index].reference,
        name : response.predictions[index].description
      })
    }
    res.send(result)
  });
});

 
 
 
// apply the routes to our application
app.use('/api', router);
app.use('/static', express.static(__dirname + '/../client'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// login routes
 
// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);