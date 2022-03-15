const { userDpSchemaModel } = require("../model/userDpModel");

const getDp = async (req, res) => {
  const { email } = req.body;

  let imageIdArray = [];

  if (email) {
    const userData = await userDpSchemaModel.find({ email: email });

    userData.map((user) => {
      imageIdArray.push(user.imagePublicId);
    });

    if (imageIdArray) {
      res.json({ recentImgId: imageIdArray[imageIdArray.length - 1] });
    }
  }
};
module.exports = { getDp };
