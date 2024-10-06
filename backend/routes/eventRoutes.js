const express = require("express");
const {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent,
	getEventById,
	bulkCreation,
	myBookings,
} = require("../controllers/eventController");
const { auth, adminAuth } = require("../middlewares/authMiddleware");
const { validateEventCreation, validate } = require("../validations/validate");
const User = require("../models/User");

const router = express.Router();

router.get("/mybookings", auth, myBookings);
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin routes (with validation)
router.post("/", auth, adminAuth, validateEventCreation, validate, createEvent);
router.put("/:id", auth, adminAuth, validateEventCreation, validate, updateEvent);
router.delete("/:id", auth, adminAuth, deleteEvent);

//bulk addition of events
router.post("/bulk", auth, adminAuth, validateEventCreation, bulkCreation);

module.exports = router;
