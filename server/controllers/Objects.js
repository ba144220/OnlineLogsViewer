const { ObjectModel } = require("../models/ObjectModel.js");

exports.getObjects = async (req, res) => {
  try {
    const data = await ObjectModel.find({ visible: true });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.postObjects = async (req, res) => {
  try {
    const { content } = req.body;
    const newObejct = new ObjectModel({ content: content });
    await newObejct.save();
    const io = await req.app.get("socket");
    io.emit("object", newObejct);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.deleteObjects = async (req, res) => {
  try {
    await ObjectModel.updateMany({ visible: true }, { visible: false });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
