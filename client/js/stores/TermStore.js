/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TermStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TermConstants = require('../constants/TermConstants');
var TermActions = require('../actions/TermActions');
var assign = require('object-assign');
var request = require('superagent');

var CHANGE_EVENT = 'change';

var _terms = [];

var key_word = "";
/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  request.post('/api/search').send({term : text}).end(function(err, res){
    if (res.ok) {
           // console.log('yay got ' + JSON.stringify(res.body));
           TermActions.load((res.body));
         } else {
           console.log('Oh no! error ' + res.text);
         }
  })
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(terms) {
  _terms = terms;
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function clear( ) {
  _terms = [];
}
 
/**
 * Delete all the completed TODO items.
 */
function updateKey(text) {
   key_word = text;
}

var TermStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return {
      options : _terms,
      word : key_word
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TermConstants.TERM_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      break;

    case TermConstants.TERM_FROM_API:
      _terms = action.text;
      TermStore.emitChange();
      break;

    case TermConstants.TERM_SELECT:
      key_word = action.text.trim();
      TermStore.emitChange();
      break;

    case TermConstants.TERM_COMPLETE:
      update(action.id, {complete: true});
      TermStore.emitChange();
      break;

    case TermConstants.TERM_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TermStore.emitChange();
      }
      break;

    case TermConstants.TERM_DESTROY:
      destroy(action.id);
      TermStore.emitChange();
      break;

    case TermConstants.TERM_DESTROY_COMPLETED:
      destroyCompleted();
      TermStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TermStore;
