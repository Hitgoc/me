const { eventModelSchema } = require("../model/eventModel");

const createEvent = async (req, res) => {
  const { eventData, email } = req.body;

  const data = new eventModelSchema({
    email: email,
    eventType: eventData.eventType,
    organisingCompany: eventData.organisingCompany,
    eventVenue: eventData.eventVenue,
    eventDate: eventData.eventDate,
    eventTime: eventData.eventTime,
  });

  const dataSaved = await data.save();

  if (dataSaved) {
    res.json({ dataSaved: true });
  } else {
    res.json({ dataSaved: false });
  }
};
module.exports = { createEvent };
