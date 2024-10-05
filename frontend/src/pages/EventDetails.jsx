// src/pages/EventDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axiosInstance.get(`/events/${id}`);
				setEvent(response.data);
			} catch (error) {
				console.error("Error fetching event:", error);
			}
		};
		fetchEvent();
	}, [id]);

	if (!event) return <p>Loading...</p>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold">{event.title}</h1>
			<p>{event.description}</p>
			<p>Date: {new Date(event.date).toLocaleDateString()}</p>
			<p>Price: ${event.price}</p>
			<button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Book Now</button>
		</div>
	);
};

export default EventDetails;
