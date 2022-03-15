const mongoose = require("mongoose");

const eventModel = mongoose.Schema({
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  organisingCompany: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
});

const eventModelSchema = mongoose.model(
  process.env.EVENTS_COLLECTION_NAME,
  eventModel
);

module.exports = { eventModelSchema };
