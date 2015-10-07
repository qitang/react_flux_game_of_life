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
var GameActions = require('../actions/GameActions');
var Row= require('./Row.react');
/**
 * Retrieve the current Term data from the TermStore
 */
 
var Game = React.createClass({

  componentWillMount: function() {
   GameActions.create({
     row : +this.props.location.query.row,
     col : +this.props.location.query.col
   })
  },


  /**
   * @return {object}
   */
  render: function() {
    var self = this
    return (
      <div>
          <h4 className="tip"><b>Hold</b> ctrl when moving the mouse to fast select cells</h4>
          <button onClick={this.next}>next</button>
          <button onClick={this.start}>start</button>
          <button onClick={this.stop}>stop</button>
          <button onClick={this.randomize}>randomize</button>
          <button onClick={this.clear}>clear</button>
          {Array.apply(null, Array(+self.props.data.row)).map(function(v, index){
            return <Row data = {self.props.data} key={index} rowIndex = {index}/>
          })}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TermStore
   */
  next : function(){ 
    GameActions.generate();
  },

  randomize : function(){ 
    GameActions.randomize();
  },
  start : function() {
     
      this.intervalID = setInterval(this.next , 300)

  },
  stop : function() {
      clearInterval(this.intervalID)
  },
  clear : function() {
      GameActions.destroy();
  }
});

module.exports = Game;
