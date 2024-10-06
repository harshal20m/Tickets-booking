// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

const AdminDashboard = () => {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate(); // Hook for navigation

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

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this event?")) {
			try {
				await axiosInstance.delete(`/events/${id}`);
				setEvents(events.filter((event) => event._id !== id));
				toast.success("Event deleted successfully");
			} catch (error) {
				console.error("Error deleting event:", error);
				toast.error("Failed to delete event");
			}
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove the token from localStorage
		toast.success("Logged out successfully");
		navigate("/admin/login"); // Redirect to login page
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<div className="flex justify-between  items-center">
				<h1 className="text-4xl font-bold text-purple-700 mb-6">Admin Dashboard</h1>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white h-8 px-4 py-1 rounded shadow-md hover:bg-red-600 transition duration-200"
				>
					Logout
				</button>
			</div>

			<div className="flex justify-between items-center mb-6">
				<Link
					to="/admin/event/new"
					className="bg-purple-500 text-white px-6 py-3 rounded shadow-md hover:bg-purple-600 transition duration-200"
				>
					Create New Event
				</Link>
			</div>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{events.map((event) => (
					<div
						key={event._id}
						className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
					>
						<h2 className="text-2xl font-semibold text-purple-700">{event.title}</h2>
						<p className="text-gray-600 mb-2">{event.description}</p>
						<p className="text-sm text-gray-500 mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
						<p className="text-sm text-gray-500 mb-4">City: {event.city}</p>

						<div className="flex justify-between">
							<Link to={`/admin/event/edit/${event._id}`} className="text-purple-500 hover:underline">
								Edit
							</Link>
							<button onClick={() => handleDelete(event._id)} className="text-red-500 hover:underline">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminDashboard;
