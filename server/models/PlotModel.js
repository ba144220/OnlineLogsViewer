const mongoose = require("mongoose");

const PlotSchema = new mongoose.Schema({
  title: { type: String, required: true },
  experiment_ids: [mongoose.ObjectId],
  x_key: { type: String, required: true },
  y_keys: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PlotModel = mongoose.model("Plot", PlotSchema);

module.exports = { PlotSchema, PlotModel };
