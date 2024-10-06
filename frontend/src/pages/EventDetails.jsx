import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify"; // Import toast for notifications

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
	const [loading, setLoading] = useState(false); // Track loading state
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvent = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance.get(`/events/${id}`);
				setEvent(response.data);
			} catch (error) {
				console.error("Error fetching event:", error);
				toast.error("Failed to load event details."); // Notify user of the error
			} finally {
				setLoading(false);
			}
		};
		fetchEvent();
	}, [id]);

	useEffect(() => {
		// Check user login status
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleBooking = () => {
		if (!isLoggedIn) {
			navigate("/login"); // Redirect to login if not logged in
		} else {
			// Navigate to the Payment page with event details
			navigate("/payment", {
				state: {
					amount: event.price, // Ensure amount is passed correctly
					bookingDetails: {
						title: event.title,
						date: event.date,
						price: event.price, // Include the price here
					},
				},
			});
		}
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>; // Loading state

	if (!event) return <p className="text-center mt-10">Event not found.</p>; // Error state

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-4xl font-bold text-purple-700 mb-4">{event.title}</h1>
				<p className="text-gray-700 mb-4">{event.description}</p>
				<p className="text-sm text-gray-500 mb-2">
					Date: <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
				</p>
				<p className="text-sm text-gray-500 mb-4">
					Price: <span className="font-semibold">${event.price}</span>
				</p>
				<button
					onClick={handleBooking}
					className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 transition-colors duration-200"
				>
					Book Now
				</button>
			</div>
		</div>
	);
};

export default EventDetails;
