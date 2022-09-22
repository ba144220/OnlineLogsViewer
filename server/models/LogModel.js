const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  content: String,
});
const LogModel = mongoose.model("log", LogSchema);

module.exports = { LogSchema, LogModel };
