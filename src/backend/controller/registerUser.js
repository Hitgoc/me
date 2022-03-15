const { userDataSchemaModel } = require("../model/userDataModel");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, pass, hashedPass } = req.body;

  let userAlreadyExists = false;

  const userData = new userDataSchemaModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    pass: hashedPass,
  });

  const existingUser = await userDataSchemaModel.find({});

  existingUser.map((user) => {
    if (user.email === email) {
      userAlreadyExists = true;
      res.json({ userAlreadyExists: true });
    }
  });

  if (!userAlreadyExists) {
    const response = await userData.save();
    if (response) {
      res.json({ userRegistered: true });
    }
  }
};

module.exports = { registerUser };
