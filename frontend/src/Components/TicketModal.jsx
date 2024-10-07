import React from "react";
import "./TicketModal.css"; // Assuming you add the custom styles here

const TicketModal = ({ booking, onClose }) => {
	if (!booking) return null; // If no booking, don't render the modal

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
			<div className="bg-gradient-to-r from-purple-500 to-purple-700 p-8 rounded-[2rem] flex shadow-2xl relative w-11/12 max-w-3xl ticket-modal">
				{/* Left Section */}
				<div className="flex flex-col justify-between text-white">
					<div className="text-center mb-6">
						<h2 className="text-3xl font-extrabold tracking-wider">
							book<span className="font-light">my</span>show
						</h2>
						<p className="text-2xl mt-1">x</p>
						<p className="text-2xl font-semibold">{booking.eventTitle}</p>
					</div>
					<div className="text-sm space-y-3 tracking-wider">
						<div className="flex items-center space-x-2">
							<i className="bx bx-map text-3xl"></i>
							<span className="text-white text-xl font-semibold">My Show</span>
						</div>
						<div className="flex items-center space-x-2">
							<i className="bx bx-time text-3xl"></i>
							<span className="text-white text-xl font-semibold">My Time</span>
						</div>
						<div className="flex items-center space-x-2">
							<i className="bx bx-checkbox-checked text-3xl"></i>
							<span className="text-white text-xl font-semibold">My Seat</span>
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="border-l-4 border-white ml-8 pl-8 flex flex-col justify-between text-white">
					<div className="text-center">
						<p className="text-sm uppercase tracking-wider">Date:</p>
						<h3 className="text-2xl font-extrabold">{new Date(booking.date).toLocaleDateString()}</h3>
						<p className="text-sm mt-4 uppercase tracking-wider">Time:</p>
						<h3 className="text-2xl font-extrabold">9:00 PM</h3>
					</div>
					<div className="text-center mt-6">
						<p className="text-sm uppercase tracking-wider">Price:</p>
						<p className="text-2xl font-semibold">₹{booking.price}</p>
						<p className="text-sm uppercase tracking-wider mt-4">Ticket Number:</p>
						<p className="text-2xl font-semibold">{booking.ticketNumber}</p>
					</div>
				</div>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition-all duration-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Dotted Cuttings */}
				<div className="absolute inset-x-0 top-0 h-2 border-t border-white border-dotted mt-[-10px]" />
				<div className="absolute inset-x-0 bottom-0 h-2 border-b border-white border-dotted mb-[-10px]" />
			</div>
		</div>
	);
};

export default TicketModal;
