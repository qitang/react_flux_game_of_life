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
var TermStore = require('../stores/TermStore');

var StartPage= require('./startPage.react');
/**
 * Retrieve the current Term data from the TermStore
 */
function getTermState() {
  return {
    options: TermStore.getAll(),
    term : ""
  };
}

var Game = React.createClass({

  getInitialState: function() {
    return getTermState();
  },

  componentDidMount: function() {
    TermStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TermStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        111111111
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TermStore
   */
  _onChange: function() {
    this.setState(getTermState());
  }

});

module.exports = Game;
