const express = require("express");
const {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent,
	getEventById,
	bulkCreation,
} = require("../controllers/eventController");
const { auth, adminAuth } = require("../middlewares/authMiddleware");
const { validateEventCreation, validate } = require("../validations/validate");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin routes (with validation)
router.post("/", auth, adminAuth, validateEventCreation, validate, createEvent);
router.put("/:id", auth, adminAuth, validateEventCreation, validate, updateEvent);
router.delete("/:id", auth, adminAuth, deleteEvent);

//bulk addition of events
router.post("/bulk", auth, adminAuth, validateEventCreation, bulkCreation);

module.exports = router;
