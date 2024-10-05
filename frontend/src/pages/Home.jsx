// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
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
			<h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{events.map((event) => (
					<div key={event._id} className="p-4 border rounded">
						<h2 className="text-xl font-semibold">{event.title}</h2>
						<p>{event.description}</p>
						<p>Date: {new Date(event.date).toLocaleDateString()}</p>
						<a href={`/event/${event._id}`} className="text-blue-500 underline">
							View Details
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
