import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const Home = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axiosInstance.get("/events");
				setEvents(response.data);
			} catch (error) {
				console.error("Error fetching events:", error.response ? error.response.data : error.message);
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};
		fetchEvents();
	}, []);

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-center mb-8 text-purple-700">Upcoming Events</h1>
			{loading ? (
				// <div className="text-center text-purple-600">
				// 	{/* You can replace this with a spinner component or animation */}
				// </div>
				<Loader />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event) => (
						<div
							key={event._id}
							className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<h2 className="text-2xl font-semibold text-purple-600 mb-2">{event.title}</h2>
							<p className="text-gray-700 mb-4">{event.description}</p>
							<p className="text-sm text-gray-500 mb-4">
								Date: {new Date(event.date).toLocaleDateString()}
							</p>
							<p className="text-sm text-gray-500 mb-4">Price: Rs.{event.price} onwards</p>
							<Link
								to={`/event/${event._id}`}
								className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-200"
							>
								View Details
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
