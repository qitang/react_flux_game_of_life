/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * GameStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GameConstants = require('../constants/GameConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Cell = function(row, col, val) {
    this.row = row;
    this.val = val;
    this.col = col;
}

var _cells = [];

function init(row, col) {
  console.log(row,col)
  for(var i =0; i <row ;i++) {
    for(var j =0 ;j < col ; j++) {
      _cells.push(new Cell(i, j , 1));
    }
  }
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

var GameStore = assign({}, EventEmitter.prototype, {

 
 
  getAll: function() {
    return _cells;
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
    case GameConstants.Game_CREATE:
      if (action.text !== null) {
        init(action.text);
        GameStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (GameStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      GameStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      GameStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      GameStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        GameStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      GameStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      GameStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = GameStore;
