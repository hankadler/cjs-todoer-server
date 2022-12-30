const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  index: {
    type: Number,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Activity", schema);
