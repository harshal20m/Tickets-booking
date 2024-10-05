// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminDashboard = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axiosInstance.get("/events");
				setEvents(response.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
			<Link to="/admin/event/new" className="bg-blue-500 text-white px-4 py-2 rounded">
				Create New Event
			</Link>
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{events.map((event) => (
					<div key={event._id} className="p-4 border rounded">
						<h2 className="text-xl font-semibold">{event.title}</h2>
						<p>{event.description}</p>
						<p>Date: {new Date(event.date).toLocaleDateString()}</p>
						<Link to={`/admin/event/edit/${event._id}`} className="text-blue-500 underline">
							Edit
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminDashboard;
