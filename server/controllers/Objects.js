const { ObjectModel } = require("../models/ObjectModel.js");

const getObjects = async (req, res) => {
  try {
    const data = await ObjectModel.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
const postObjects = async (req, res) => {
  try {
    const { content } = req.body;
    const newLog = new ObjectModel({ content: content });
    await newLog.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
module.exports = { getObjects, postObjects };
