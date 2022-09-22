const { LogModel } = require("../models/LogModel.js");

exports.getLogs = async (req, res) => {
  try {
    const data = await LogModel.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.postLogs = async (req, res) => {
  try {
    const { content } = req.body;
    const newLog = new LogModel({ content: content });
    await newLog.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
