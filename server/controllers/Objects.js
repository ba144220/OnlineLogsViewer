const { ObjectModel } = require("../models/ObjectModel.js");

exports.getObjects = async (req, res) => {
  try {
    const title = req.query?.title;
    let data;
    if (title) {
      data = await ObjectModel.find({ visible: true, title: title });
    } else {
      data = await ObjectModel.find({ visible: true });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.postObjects = async (req, res) => {
  try {
    const { content, title } = req.body;
    const newObejct = new ObjectModel({ content: content, title: title });
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
