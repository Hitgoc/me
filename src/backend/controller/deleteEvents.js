const { eventModelSchema } = require("../model/eventModel");

const deleteEvents = async (req, res) => {
  const { eventId, email } = req.body;

  if (!eventId && !email) {
    return;
  }

  const response = await eventModelSchema.deleteOne({
    email: email,
    _id: eventId,
  });

  if (response) {
    res.json({ response: true });
  }
};
module.exports = { deleteEvents };
