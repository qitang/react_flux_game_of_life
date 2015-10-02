/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * GAMEConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  GAME_CREATE: null,
  GAME_COMPLETE: null,
  GAME_DESTROY: null,
  GAME_DESTROY_COMPLETED: null,
  GAME_TOGGLE_COMPLETE_ALL: null,
  GAME_UNDO_COMPLETE: null,
  GAME_UPDATE_TEXT: null
});
