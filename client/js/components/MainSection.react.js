/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Entry = require('./Entry.react')

var MainSection = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    

    var restaurants = this.props.restaurants;


     
    var data = [];

    for(var i =0 ; i< restaurants.length ; i++) {
      data.push(<Entry info={restaurants[i]}/>)
    }

    

    return (
      <tbody>{data}</tbody>
    );
  },

 
});

module.exports = MainSection;
