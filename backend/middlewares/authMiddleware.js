const jwt = require("jsonwebtoken");

// Verify JWT token
exports.auth = (req, res, next) => {
	const token = req.header("Authorization");
	console.log(token);
	if (!token) return res.status(401).json({ message: "No token, authorization denied" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};

// Check if user is admin
exports.adminAuth = (req, res, next) => {
	if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
	next();
};
