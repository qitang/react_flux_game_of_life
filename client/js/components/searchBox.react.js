/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;
var TermStore = require('../stores/TermStore')
var TermAction = require('../actions/TermActions')

var Typeahead = require('react-typeahead').Typeahead;
// React.render(
//   <Typeahead
//     options={['John', 'Paul', 'George', 'Ringo']}
//     maxVisible={2}
//   />
// );

 getOptions = function() {
     return TermStore.getAll();
  }



var SearchBox = React.createClass({

 

  componentDidMount: function() {
    TermStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TermStore.removeChangeListener(this._onChange);
  },
   getInitialState: function(){
      return getOptions();
   },

   _onChange: function(options) {
     this.setState(getOptions());
   },

   onClick : function(event){
      TermAction.create(event.target.value)
   },

   search : function(){

   },
   
   onSelect : function(){
      TermAction.select(event.target.value);
   },
   render : function(){
    console.log(this.state)
     return (<div><Typeahead 
        options={this.state.options.map(function(c){ return c.name})} onOptionSelected={onSelect}
        maxVisible={4} onKeyDown={this.onClick} 
      /><input onClick="search" value="submit" /></div>)
   }

})

 

module.exports = SearchBox;
