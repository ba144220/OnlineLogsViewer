const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  content: Object,
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
const SampleModel = mongoose.model("Sample", SampleSchema);

module.exports = { SampleSchema, SampleModel };
