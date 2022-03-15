const mongoose = require("mongoose");

const userDataModel = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const userDataSchemaModel = mongoose.model(
  process.env.USER_COLLECTION_NAME,
  userDataModel
);

module.exports = { userDataSchemaModel };
