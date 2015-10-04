/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Cell = require('./Cell.react')
var Row = React.createClass({

  render: function() {
    var self = this;
    var cn = "row";
    if(this.props.rowIndex == 0) {
      cn += " topRow" 
    }
    if(+this.props.data.row === ( + this.props.rowIndex + 1)) {
      cn += " botRow" 
    }
    return (
      <div className={cn}>
                {Array.apply(null, Array(+this.props.data.col)).map(function(v ,index){
                  return <Cell data = {self.props.data} colIndex = {index} key={index} rowIndex = {self.props.rowIndex}/>
                })}
            </div>
    );
  }

});

module.exports = Row;
