const express = require("express");
const { auth } = require("../controller/auth");
const { createEvent } = require("../controller/createEvent");
const { deleteAllEvents } = require("../controller/deleteAllEvents");
const { deleteEvents } = require("../controller/deleteEvents");
const { getDp } = require("../controller/getDp");
const { loginUser } = require("../controller/loginUser");
const { registerUser } = require("../controller/registerUser");
const { showEvents } = require("../controller/showEvents");
const { uploadDP } = require("../controller/uploadDP");
const { uploadId } = require("../controller/uploadId");
const router = express.Router();

router.use("/registered", registerUser);

router.use("/loggedin", loginUser);

router.use("/uploads", uploadDP);

router.use("/uploadId", uploadId);

router.use("/auth", auth);

router.use("/get-dp", getDp);

router.use("/create-event", createEvent);

router.use("/show-events", showEvents);

router.use("/delete-events", deleteEvents);

router.use("/delete-all-events", deleteAllEvents);

module.exports = { router };
