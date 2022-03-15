const mongoose = require("mongoose");

const userDpModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
});

const userDpSchemaModel = mongoose.model(
  process.env.UPLOADS_COLLECTION_NAME,
  userDpModel
);

module.exports = { userDpSchemaModel };
