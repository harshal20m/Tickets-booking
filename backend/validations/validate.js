const { check, validationResult } = require("express-validator");

// Validate user registration
exports.validateUserRegister = [
	check("name", "Name is required").not().isEmpty(),
	check("email", "Please include a valid email").isEmail(),
	check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

// Validate user login
exports.validateUserLogin = [
	check("email", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists(),
];

// Validate event creation (admin)
exports.validateEventCreation = [
	check("title", "Event title is required").not().isEmpty(),
	check("description", "Description is required").not().isEmpty(),
	check("city", "city is required").not().isEmpty(),
	check("date", "A valid event date is required").isISO8601(),
	check("price", "Price must be a number").isNumeric(),
	check("availableSeats", "Available seats must be a number").isNumeric(),
];

// Middleware to handle validation results
exports.validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("chud gya middleware");
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
