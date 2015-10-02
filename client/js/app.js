/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

// // var TodoApp = require('./components/TodoApp.react');
var StartPage = require('./components/startPage.react');
var App = require('./components/App.react');


var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute  = ReactRouter.IndexRoute 
 

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={StartPage} />
    </Route>
  </Router>
), document.getElementById('app'))