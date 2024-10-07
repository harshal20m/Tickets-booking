import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Payment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { amount, bookingDetails } = location.state || {};

	const [formData, setFormData] = useState({
		customerName: "",
		customerEmail: "",
		customerMobile: "",
	});

	const [paymentKey, setPaymentKey] = useState("");
	const [loading, setLoading] = useState(true);
	const [orderLoading, setOrderLoading] = useState(false);

	// Fetch Payment Key
	useEffect(() => {
		const fetchPaymentKey = async () => {
			try {
				const response = await axiosInstance.get("/payment-key");
				setPaymentKey(response.data.key);
			} catch (error) {
				console.error("Error fetching payment key:", error);
				toast.error("Failed to fetch payment key. Please try again.");
				navigate("/events");
			} finally {
				setLoading(false);
			}
		};

		fetchPaymentKey();
	}, [navigate]);

	if (!amount || !bookingDetails) {
		toast.error("Invalid booking details. Please try again.");
		navigate("/events");
		return null;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePayment = async (e) => {
		e.preventDefault();
		if (!/^\d{10}$/.test(formData.customerMobile)) {
			toast.error("Please enter a valid 10-digit mobile number.");
			return;
		}
		setOrderLoading(true);

		try {
			const orderResponse = await axiosInstance.post("/create-order", {
				amount: amount,
			});

			const { order_id, amount: orderAmount } = orderResponse.data;

			// Initialize Razorpay Checkout
			const options = {
				key: paymentKey,
				amount: orderAmount,
				currency: "INR",
				name: formData.customerName,
				description: bookingDetails?.title || "Event Booking",
				order_id,
				handler: async function (response) {
					if (!response.razorpay_payment_id) {
						toast.error("Payment failed. Please try again.");
						return;
					}
					const paymentData = {
						razorpay_order_id: response.razorpay_order_id,
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
						bookingDetails: {
							...bookingDetails,
							amount,
						},
					};

					try {
						const verifyResponse = await axiosInstance.post("/verify-payment", paymentData);
						if (verifyResponse.data.success) {
							toast.success("Payment successful!");
							navigate("/mybookings");
						} else {
							toast.error("Payment verification failed. Please try again.");
						}
					} catch (error) {
						console.error("Payment verification error:", error);
						toast.error("An error occurred while verifying the payment.");
					}
				},
				prefill: {
					name: formData.customerName,
					email: formData.customerEmail,
					contact: formData.customerMobile,
				},
				theme: {
					color: "#b967ff",
				},
			};

			const rzp = new window.Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Error during payment initiation:", error);
			toast.error("Failed to initiate payment. Please try again.");
		} finally {
			setOrderLoading(false);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
			{loading ? (
				<div className="flex justify-center items-center">
					<p>Loading payment information...</p>
				</div>
			) : (
				<>
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Payment Details for {bookingDetails?.title || "Event"}
					</h2>
					<form onSubmit={handlePayment} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Name:</label>
							<input
								type="text"
								name="customerName"
								value={formData.customerName}
								onChange={handleChange}
								required
								disabled={orderLoading}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Email:</label>
							<input
								type="email"
								name="customerEmail"
								value={formData.customerEmail}
								onChange={handleChange}
								required
								disabled={orderLoading}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Mobile:</label>
							<input
								type="tel"
								name="customerMobile"
								value={formData.customerMobile}
								onChange={handleChange}
								required
								disabled={orderLoading}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200"
							/>
						</div>
						<div className="text-center">
							<p className="text-lg font-semibold text-gray-800">
								Amount: <span className="text-purple-600">Rs.{amount}</span>
							</p>
						</div>
						<button
							type="submit"
							className={`w-full p-3 rounded-md text-white font-semibold transition-colors duration-200 ${
								orderLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
							}`}
							disabled={orderLoading}
						>
							{orderLoading ? "Processing..." : "Pay Now"}
						</button>
					</form>
				</>
			)}
		</div>
	);
};

export default Payment;
