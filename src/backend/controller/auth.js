const jwt = require("jsonwebtoken");
const { userDataSchemaModel } = require("../model/userDataModel");


const auth = async (req, res) => {
  const SK = process.env.SK;

  let user;

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, SK);

    req.userData = { email: decodedToken.email };

    const email = req.userData.email;

    user = await userDataSchemaModel.find({});

    user.map((user) => {
      if (email === user.email) {
        res.json({
          email: email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { auth };
