'use strict';

import mongoose from 'mongoose';

var MoviequoteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Moviequote', MoviequoteSchema);
