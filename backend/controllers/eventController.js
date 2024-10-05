const Event = require("../models/Event");

// Create new event (admin only)
exports.createEvent = async (req, res) => {
	const { title, description, date, price, availableSeats } = req.body;
	try {
		const newEvent = new Event({ title, description, date, price, availableSeats });
		await newEvent.save();
		res.status(201).json(newEvent);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get all events
exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get single event by ID
exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ message: "Event not found" });
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

// Update event (admin only)
exports.updateEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!event) return res.status(404).json({ message: "Event not found" });
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

// Delete event (admin only)
exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.id);
		if (!event) return res.status(404).json({ message: "Event not found" });
		res.json({ message: "Event deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};
