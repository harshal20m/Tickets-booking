import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const EditEvent = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const [availableSeats, setAvailableSeats] = useState("");
	const [city, setCity] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axiosInstance.get(`/events/${id}`);
				const { title, description, date, price, availableSeats, city } = response.data;
				setTitle(title);
				setDescription(description);
				setDate(date.split("T")[0]); // Ensure date is in YYYY-MM-DD format
				setPrice(price);
				setAvailableSeats(availableSeats);
				setCity(city);
			} catch (error) {
				toast.error("Error fetching event:", error);
			}
		};
		fetchEvent();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`/events/${id}`, { title, description, date, price, availableSeats, city });
			toast.success("Edited Successfully");
			navigate("/admin/dashboard");
		} catch (error) {
			toast.error("Error updating event:", error);
		}
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">Edit Event</h1>
			<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="title">
					Event Title
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">
					Event Description
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="date">
					Event Date
				</label>
				<input
					id="date"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="city">
					Event City
				</label>
				<input
					id="city"
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="price">
					Event Price
				</label>
				<input
					id="price"
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="availableSeats">
					Available Seats
				</label>
				<input
					id="availableSeats"
					type="number"
					value={availableSeats}
					onChange={(e) => setAvailableSeats(e.target.value)}
					className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
					required
				/>

				<button
					type="submit"
					className="bg-purple-500 text-white py-3 rounded w-full hover:bg-purple-600 transition duration-200"
				>
					Update Event
				</button>
			</form>
		</div>
	);
};

export default EditEvent;
