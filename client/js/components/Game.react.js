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

  getInitialState : function() {
    return {
      intervalID : null,
      speed : 10
    }
  },
  /**
   * @return {object}
   */
  render: function() {
    var self = this;
    var ctrlButton;
    if(this.state.intervalID) {
      ctrlButton = <button onClick={this.stop}>stop</button>
    } else {
      ctrlButton = <button onClick={this.start}>start</button>
    }

    return (
      <div>
          <h4 className="tip"><b>Hold</b> ctrl when moving the mouse to fast select cells</h4>
          <button onClick={this.next}>next</button>
          {ctrlButton}
          <button onClick={this.randomize}>randomize</button>
          <button onClick={this.clear}>clear</button>
          <br/>
          <div>
              <label  className='vertical'>speed :  1</label><input type='range' min="1" max="20" onChange={this.updateSpeed}/><label className='vertical'> 20</label>
          </div>
          <br/>
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

  updateSpeed : function(e) {
    this.setState({ speed: e.currentTarget.valueAsNumber });
    this.stop();
    console.log(this.state)
  },
  randomize : function(){ 
    GameActions.randomize();
  },
  start : function() {
      var timeout = 1000/(this.state.speed);
      console.log(timeout)
      this.state.intervalID = setInterval(this.next , timeout)
  },
  stop : function() {
      clearInterval(this.state.intervalID);
      this.setState({intervalID:null});
  },
  clear : function() {
      GameActions.destroy();
  }
});

module.exports = Game;
