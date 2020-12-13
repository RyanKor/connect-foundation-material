const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  lineThrough: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
