const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  content: String,
  title: { type: String, required: true },
  visible: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const LogModel = mongoose.model("log", LogSchema);

module.exports = { LogSchema, LogModel };
