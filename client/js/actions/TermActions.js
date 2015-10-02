/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TermActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TermConstants = require('../constants/TermConstants');

var TermActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TermConstants.TERM_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  load: function(options) {
    console.log("load", options)
    AppDispatcher.dispatch({
      actionType: TermConstants.TERM_FROM_API,
      text: options
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  select: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TERM_SELECT
    });
  }

};

module.exports = TermActions;
