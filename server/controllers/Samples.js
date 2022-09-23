const { SampleModel } = require("../models/SampleModel.js");

exports.getSamples = async (req, res) => {
  try {
    const title = req.query?.title;
    let data;
    if (title) {
      data = await SampleModel.find({ visible: true, title: title });
    } else {
      data = await SampleModel.find({ visible: true });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.postSamples = async (req, res) => {
  try {
    const { content, title } = req.body;
    const newObejct = new SampleModel({ content: content, title: title });
    await newObejct.save();
    const io = await req.app.get("socket");
    io.emit("Sample", newObejct);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.deleteSamples = async (req, res) => {
  try {
    await SampleModel.updateMany({ visible: true }, { visible: false });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
