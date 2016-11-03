/**
 * Moviequote model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviequote from './moviequote.model';
var MoviequoteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviequoteEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Moviequote.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviequoteEvents.emit(event + ':' + doc._id, doc);
    MoviequoteEvents.emit(event, doc);
  };
}

export default MoviequoteEvents;
