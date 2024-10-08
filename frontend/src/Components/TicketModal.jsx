import React from "react";
import "./TicketModal.css";

const TicketModal = ({ booking, onClose }) => {
	if (!booking) return null;

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
			<div className="relative w-full max-w-2xl rounded-full">
				{console.log(booking)}
				{/* Ticket Structure */}
				<div className="absolute top-0 left-0 w-8 h-8 bg-pink-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
				<div className="absolute bottom-0 left-0 w-8 h-8 bg-pink-100 rounded-full -translate-x-1/2 translate-y-1/2"></div>

				<div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-l-3xl text-white shadow-2xl">
					{/* Header Section */}
					<div className="flex justify-between items-start mb-6">
						<div>
							<h2 className="text-3xl font-bold mb-2">bookmyshow</h2>
							<div className="text-xl font-semibold mb-4">×</div>
							<h3 className="text-2xl font-bold">{booking.eventTitle}</h3>
						</div>
					</div>

					{/* Details Section */}
					<div className="border-t border-b border-white py-4 mb-6">
						<div className="flex justify-between text-sm">
							<span>SHOW</span>
							<span>{booking.city || "Venue Not Available"}</span>
							<span>SEATS: {booking.seat || "N/A"}</span>
						</div>
					</div>

					{/* Date and Time Section */}
					<div className="flex">
						<div className="flex-1 pr-4 border-r border-dashed">
							<div className="text-sm mb-1">DATE:</div>
							<div className="text-2xl font-bold">{new Date(booking.date).toLocaleDateString()}</div>
						</div>
						<div className="flex-1 pl-4">
							<div className="text-sm mb-1">TIME:</div>
							<div className="text-2xl font-bold">{booking.time || "9:00 PM"}</div>
						</div>
					</div>
				</div>

				{/* Ticket Number and Price Section */}
				<div className="absolute right-0 top-1/2 bg-purple-500 text-white p-4 rounded-r-3xl -translate-y-1/2">
					<div className="text-xs mb-1">TICKET NO:</div>
					<div className="text-sm font-semibold">{booking.ticketNumber}</div>
					<div className="text-xs mt-3">PRICE:</div>
					<div className="text-sm font-semibold">₹{booking.price}</div>
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
			</div>
		</div>
	);
};

export default TicketModal;
