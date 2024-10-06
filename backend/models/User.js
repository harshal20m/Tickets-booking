const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "user" }, // Can be 'admin' or 'user'
	bookings: { type: Array, default: [] }, // Initialize bookings as an empty array
});

module.exports = mongoose.model("User", userSchema);
