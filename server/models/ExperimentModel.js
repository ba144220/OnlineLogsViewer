const mongoose = require("mongoose");

const ExperimentSchema = new mongoose.Schema({
  project_id: mongoose.ObjectId,
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ExperimentModel = mongoose.model("Experiment", ExperimentSchema);

module.exports = { ExperimentSchema, ExperimentModel };
