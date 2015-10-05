/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
  
var React = require('react');


var formStyle = {
  backgroundColor: 'grey',
  padding : '200px'
};

var StartPage = React.createClass({
 

  /**
   * @return {object}
   */
  handleSubmit : function(){
    event.preventDefault();
 
    this.props.history.pushState(null, '/main', {row: this.refs.row.getDOMNode().value,col: this.refs.col.getDOMNode().value});
    this.refs.row.getDOMNode().value = '';
    this.refs.col.getDOMNode().value = '';
  },
  render: function() {
    return (
        <form style={formStyle} onSubmit={this.handleSubmit}>
            <input type="text" ref="row"   placeholder="row number"/>
            <input type="text" ref="col"  placeholder="column number"/>
            <input type="submit" value="start"/>
        </form>
      )
  },

 

});

module.exports = StartPage;
