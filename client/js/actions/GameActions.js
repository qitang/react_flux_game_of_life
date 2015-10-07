/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * GameActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var GameActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the Game item
   * @param  {string} text
   */
  update: function(rowIndex, colIndex, value) {
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_UPDATE,
      colIndex: +colIndex,
      rowIndex: +rowIndex,
      value : value
    });
  },


  /**
   * Toggle whether a single Game is complete
   * @param  {object} Game
   */
  generate: function() {
    
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_GENERATE,
    });
  },

  randomize : function(){
    AppDispatcher.dispatch({
      actionType: GameConstants.GAME_RANDOMIZE,
    });
  },
  
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: GameConstants.Game_DESTROY,
    });
  },

  /**
   * Delete all the completed Games
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: GameConstants.Game_DESTROY_COMPLETED
    });
  }

};

module.exports = GameActions;
