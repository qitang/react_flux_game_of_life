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

var _data = {
   cells : [],
   row : 0,
   col : 0
}

function init(payload) {
    _data.row = payload.row;
    _data.col = payload.col;
   for(var i = 0 ;i < payload.row * payload.col ; i++) {
      _data.cells.push(false);
   }
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(rowIndex, colIndex, value) {
  if(value) {
    _data.cells[rowIndex *_data.col + colIndex] = value;
  } else {
    _data.cells[rowIndex *_data.col + colIndex] = !_data.cells[rowIndex *_data.col + colIndex];
  }
}

function to1D(row, col) {
  return row *_data.col + col;
}

function randomize() {
  for(var i =0 ;i < _data.cells.length ; i ++ ) {
    _data.cells[i] = Math.random() > 0.44
  }
}

function destroy() {
  for(var i =0 ; i <_data.cells.length; i++) {
    _data.cells[i] = false;
  }
}

function checkAround(row, col) {
  var count = 0;
  var cells = _data.cells;
  var current = cells[to1D(row, col)];
  for(var i = col-1; i<=col+1 ; i++) {
    for(var j = row-1; j <=row+1 ; j++) {
     if(i<0 || j <0) continue;
     if(i >=_data.col || j >= _data.row) continue;
     if(cells[to1D(j,i)]) {

        count++;
     }
    }
  }
  return current ? count-1 : count;
}

function generate() {
  var cp = _data.cells.slice();
  for(var i =0 ; i<_data.row; i++ ) {
    for(var j = 0 ; j < _data.col; j++) {
      var index = to1D(i,j);
      var around = checkAround(i,j);
      if(_data.cells[index]) {
        if(around < 2 || around > 3) {
          cp[index] = false;
        }
      } else if(around===3) {
        cp[index] = true;
      }
    }
  }
  _data.cells = cp;
}

var GameStore = assign({}, EventEmitter.prototype, {

 
 
  getAll: function() {
    return _data;
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

  switch(action.actionType) {
    case GameConstants.GAME_CREATE:
      if (action.text !== null) {
        init(action.text);
        GameStore.emitChange();
      }
      break;
    case GameConstants.GAME_UPDATE:
      update(action.rowIndex, action.colIndex, action.value)
      GameStore.emitChange();
      break;
    case GameConstants.GAME_GENERATE:
      generate();
      GameStore.emitChange();
      break;
    case GameConstants.GAME_RANDOMIZE: 
      randomize();
      GameStore.emitChange();
      break;
    case GameConstants.Game_DESTROY:
      destroy();
      GameStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = GameStore;
