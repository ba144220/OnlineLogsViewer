const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  editors: [mongoose.ObjectId],
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = { ProjectSchema, ProjectModel };
