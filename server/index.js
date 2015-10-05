/**
 * Express configuration
 */

'use strict';

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var path = require('path');

var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;
 
 
// we'll create our routes here

// get an instance of router
var router = express.Router();

 
 

app.get('/', function(req,res){
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
})
app.use('/client', express.static(__dirname + '/../client'));

app.route('/*')
  .get(function(req, res) {
    res.sendfile(path.resolve(__dirname + '/../client/index.html'));
  })
  
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// login routes
 
// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);