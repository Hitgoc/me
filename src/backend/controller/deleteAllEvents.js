const { eventModelSchema } = require("../model/eventModel");

const deleteAllEvents = async (req, res) => {
  const { email } = req.body;

  const response = await eventModelSchema.deleteMany({ email: email });
  if (response) {
    res.json({ response: true });
  }
};

module.exports = { deleteAllEvents };
