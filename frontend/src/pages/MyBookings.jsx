import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import TicketModal from "../Components/TicketModal"; // Import the modal component

const MyBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking
	const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axiosInstance.get("/events/mybookings", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				setBookings(response.data);
			} catch (error) {
				toast.error("Error fetching bookings: " + error.response?.data?.message || "Network Error");
			}
		};
		fetchBookings();
	}, []);

	// Function to handle ticket click
	const handleTicketClick = (booking) => {
		setSelectedBooking(booking); // Set selected booking
		setModalOpen(true); // Open modal
	};

	return (
		<div className="container mx-auto p-6 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">My Bookings</h1>
			{bookings.length === 0 ? (
				<p className="text-gray-700 text-center">You have no bookings yet.</p>
			) : (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{bookings.map((booking, index) => (
						<li
							key={index}
							className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
						>
							<h2 className="text-2xl font-semibold text-purple-600">{booking.eventTitle}</h2>
							<p className="text-gray-600 mt-2">
								Date: <strong>{new Date(booking.date).toLocaleDateString()}</strong>
							</p>
							<p className="text-gray-600">
								Price: <strong>₹{booking.price}</strong>
							</p>
							<p className="text-gray-600">
								Ticket Number: <strong>{booking.ticketNumber}</strong>
							</p>
							{/* View Ticket Button with Glowing Effect */}
							<button
								onClick={() => handleTicketClick(booking)} // Click handler for opening modal
								className="mt-4 py-2 px-4 bg-purple-600 text-white rounded shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden glow-button"
							>
								View Ticket
							</button>
						</li>
					))}
				</ul>
			)}

			<div className="mt-8 text-center">
				<a
					href="/"
					className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500 transition duration-200"
				>
					Browse More Events
				</a>
			</div>

			{/* Modal for displaying ticket details */}
			{isModalOpen && (
				<TicketModal
					booking={selectedBooking}
					onClose={() => setModalOpen(false)} // Close handler
				/>
			)}
		</div>
	);
};

export default MyBookings;
