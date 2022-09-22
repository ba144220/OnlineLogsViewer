const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
  content: Object,
});
const ObjectModel = mongoose.model("object", ObjectSchema);

module.exports = { ObjectSchema, ObjectModel };
