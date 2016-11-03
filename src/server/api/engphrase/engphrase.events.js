/**
 * Engphrase model events
 */

'use strict';

import {EventEmitter} from 'events';
import Engphrase from './engphrase.model';
var EngphraseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EngphraseEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Engphrase.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EngphraseEvents.emit(event + ':' + doc._id, doc);
    EngphraseEvents.emit(event, doc);
  };
}

export default EngphraseEvents;
