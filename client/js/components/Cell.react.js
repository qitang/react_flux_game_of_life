/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var GameActions = require('../actions/GameActions');
var ReactPropTypes = React.PropTypes;

var Cell = React.createClass({
 
  

  /**
   * @return {object}
   */
  render: function() {
    var rowIndex = +this.props.rowIndex;
    var colIndex = +this.props.colIndex;
    var classString = 'cell';
    if(this.props.colIndex == 0){
      classString += " leftCell"
    }
    if(+this.props.colIndex === ( + this.props.data.col - 1)){
      classString += " rightCell"
    }
    if (this.props.data.cells[rowIndex*this.props.data.col + colIndex]) {
      classString += ' active';
    } 
  	return (
     <div className={classString} onMouseDown={this.handler} onMouseMove={this.handlerMove} ></div>
    );
  },

  handlerMove : function(event){
    if(event.ctrlKey) {
      GameActions.update(this.props.rowIndex, this.props.colIndex, true)
    }
  },
  /**
   * Event handler to delete all completed TODOs
   */
  handler : function(){
    GameActions.update(this.props.rowIndex, this.props.colIndex)
  }

});

module.exports = Cell;
