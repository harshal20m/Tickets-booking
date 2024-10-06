const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

// Razorpay API credentials from environment variables
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function generateTicketNumber() {
	// You can customize this logic to generate a more complex ticket number if needed
	return "TICKET-" + Date.now() + Math.floor(Math.random() * 1000);
}

// Create order route
router.post("/create-order", async (req, res) => {
	const { amount, currency = "INR", receipt } = req.body;

	try {
		const options = {
			amount: amount * 100, // Razorpay works with paise
			currency: currency,
			receipt: receipt || `receipt_${Date.now()}`,
		};

		// Create order using Razorpay
		const order = await razorpay.orders.create(options);

		// Send order details to the frontend
		res.status(200).json({
			success: true,
			order_id: order.id,
			amount: order.amount,
			currency: order.currency,
		});
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		res.status(500).json({ message: "Failed to create order", error });
	}
});

// Verify payment route
const User = require("../models/User"); // Import your User model
const { auth } = require("../middlewares/authMiddleware");

router.post("/verify-payment", auth, async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body; // Add bookingDetails here

	// Create the expected signature to verify the payment
	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
		.update(razorpay_order_id + "|" + razorpay_payment_id)
		.digest("hex");

	// Compare signatures to ensure payment is authentic
	if (razorpay_signature === expectedSignature) {
		try {
			const userId = req.user.userId; // Get user ID from the authenticated request
			console.log(userId);

			// Create a booking object
			const booking = {
				eventTitle: bookingDetails.title, // Replace with actual booking details
				date: bookingDetails.date, // Add the actual event date
				price: bookingDetails.price, // Add the actual price
				ticketNumber: generateTicketNumber(), // Implement your ticket number generation logic
			};
			console.log(booking);

			// Update user's bookings array
			await User.findByIdAndUpdate(userId, {
				$push: { bookings: booking },
			});

			res.status(200).json({ success: true, message: "Payment verified successfully, booking added!" });
		} catch (error) {
			console.error("Error updating payment status:", error);
			res.status(500).json({ success: false, message: "Error processing payment" });
		}
	} else {
		// Invalid signature
		res.status(400).json({ success: false, message: "Payment verification failed" });
	}
});

router.post("/payment-callback", async (req, res) => {
	const { order_id, status, userId, eventId, eventTitle, price, date } = req.body; // Include necessary details

	try {
		const user = await User.findById(userId); // Find the user by ID
		const ticketNumber = `TICKET-${Date.now()}`; // Generate a unique ticket number

		if (status === "success") {
			// Add booking to user's bookings array
			user.bookings.push({
				ticketNumber,
				eventId,
				eventTitle,
				price,
				date,
			});
			await user.save(); // Save the user with the updated bookings

			res.status(200).send({ success: true, ticketNumber }); // Send response back
		} else {
			res.status(400).send({ success: false });
		}
	} catch (error) {
		console.error("Error processing payment callback:", error);
		res.status(500).send({ success: false });
	}
});

// Return Razorpay key to frontend
router.get("/payment-key", (req, res) => {
	res.json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
