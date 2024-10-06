// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

const MyBookings = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axiosInstance.get("/my-bookings"); // You will need to create this API endpoint
				setBookings(response.data);
			} catch (error) {
				toast.error("Error fetching bookings:", error);
			}
		};
		fetchBookings();
	}, []);

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6">My Bookings</h1>
			{bookings.length === 0 ? (
				<p className="text-gray-700">You have no bookings yet.</p>
			) : (
				<ul>
					{bookings.map((booking) => (
						<li key={booking.id} className="p-4 bg-white rounded-lg shadow-md mb-4">
							<h2 className="text-2xl font-semibold">{booking.eventTitle}</h2>
							<p>Date: {new Date(booking.date).toLocaleDateString()}</p>
							<p>Price: ${booking.price}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MyBookings;
