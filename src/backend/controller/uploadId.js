const { userDpSchemaModel } = require("../model/userDpModel");

const uploadId = async (req, res) => {
  const { imagePublicId, email } = req.body;

  const userData = new userDpSchemaModel({
    email: email,
    imagePublicId: imagePublicId,
  });

  await userData.save();
};
module.exports = { uploadId };
