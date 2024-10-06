const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

// Login user
exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
			expiresIn: "12h",
		});

		// res.json({ token, user });
		setTimeout(() => {
			res.json({ token, user });
		}, 3000);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};
