const { cloudinary } = require("../cloud/cloud");

const uploadDP = async (req, res) => {
  const { imageString } = req.body;

  const response = await cloudinary.uploader.upload(imageString, {
    upload_preset: process.env.UPLOAD_PRESET,
  });

  if (response) {
    res.json({ response: response });
  }
};

module.exports = { uploadDP };
