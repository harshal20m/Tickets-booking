// src/pages/CreateEvent.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

const CreateEvent = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const [availableSeats, setAvailableSeats] = useState("");
	const [city, setCity] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.post("/events", { title, description, date, city, price, availableSeats });
			toast.success("Event Created Successfully");
			navigate("/admin/dashboard");
		} catch (error) {
			toast.error("Error creating event:", error);
		}
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">Create Event</h1>
			<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Event Title"
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Event Description"
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>
				<input
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder="Event City"
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Event Price"
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>
				<input
					type="number"
					value={availableSeats}
					onChange={(e) => setAvailableSeats(e.target.value)}
					placeholder="Available Seats"
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>
				<button
					type="submit"
					className="bg-purple-500 text-white py-3 rounded w-full hover:bg-purple-600 transition duration-200"
				>
					Create Event
				</button>
			</form>
		</div>
	);
};

export default CreateEvent;
