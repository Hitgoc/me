const { eventModelSchema } = require("../model/eventModel");

const showEvents = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return;
  }

  const data = await eventModelSchema.find({ email: email });

  if (data) {
    res.json({ data: data });
  }
};

module.exports = { showEvents };
