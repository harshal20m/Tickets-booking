// src/pages/CreateEvent.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.post("/events", { title, description, date, price });
			navigate("/admin/dashboard");
		} catch (error) {
			console.error("Error creating event:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Create Event</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					className="mb-4 p-2 border"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
					className="mb-4 p-2 border"
					required
				/>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className="mb-4 p-2 border"
					required
				/>
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Price"
					className="mb-4 p-2 border"
					required
				/>
				<button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
					Create Event
				</button>
			</form>
		</div>
	);
};

export default CreateEvent;
