/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TermStore and passes the new data to its children.
 */

var React = require('react');
var GameStore = require('../stores/GameStore');
var Game = require('./Game.react');
/**
 * Retrieve the current Term data from the TermStore
 */
function getAllState() {
   return {
     cells : GameStore.getAll(),
   }
}

var App = React.createClass({

  getInitialState: function() {
    return getAllState();
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <h1>Welcome to Game of Life</h1>
        {this.props.children}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TermStore
   */
  _onChange: function() {
    this.setState(getAllState());
  }

});

module.exports = App;
