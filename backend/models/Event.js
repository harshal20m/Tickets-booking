const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true },
	price: { type: Number, required: true },
	availableSeats: { type: Number, required: true },
	city: { type: String, required: true }, // Add city here
});

module.exports = mongoose.model("Event", eventSchema);
