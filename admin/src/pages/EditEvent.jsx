// src/pages/EditEvent.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EditEvent = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axiosInstance.get(`/events/${id}`);
				const { title, description, date, price } = response.data;
				setTitle(title);
				setDescription(description);
				setDate(date.split("T")[0]);
				setPrice(price);
			} catch (error) {
				console.error("Error fetching event:", error);
			}
		};
		fetchEvent();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`/events/${id}`, { title, description, date, price });
			navigate("/admin/dashboard");
		} catch (error) {
			console.error("Error updating event:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Edit Event</h1>
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
				<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
					Update Event
				</button>
			</form>
		</div>
	);
};

export default EditEvent;
