const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userDataSchemaModel } = require("../model/userDataModel");

const loginUser = async (req, res) => {
  const SK = process.env.SK;
  const SKT = process.env.SKT;

  const { email, pass } = req.body;

  const userData = await userDataSchemaModel.find({ email: email });

  if (userData.length === 0) {
    res.json({ noUser: true });
    return;
  }

  userData.map(async (user) => {
    if (user.email === email) {
      const passMatched = await bcrypt.compare(pass, user.pass);

      if (passMatched) {
        const token = jwt.sign({ email: user.email }, SK, { expiresIn: SKT });

        res.json({ loggedIn: true, token: token });
      } else {
        res.json({ loggedIn: false });
      }
    }
  });
};

module.exports = { loginUser };
