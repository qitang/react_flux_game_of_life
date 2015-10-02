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
      actionType: GameConstants.Game_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the Game item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: GameConstants.Game_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single Game is complete
   * @param  {object} Game
   */
  toggleComplete: function(Game) {
    var id = Game.id;
    var actionType = Game.complete ?
        GameConstants.Game_UNDO_COMPLETE :
        GameConstants.Game_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all Games as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: GameConstants.Game_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: GameConstants.Game_DESTROY,
      id: id
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
