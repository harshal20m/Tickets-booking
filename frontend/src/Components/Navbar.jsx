// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

const Navbar = () => {
	const navigate = useNavigate();
	const isLoggedIn = !!localStorage.getItem("token"); // Check login status

	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token from local storage
		toast.success("Logged Out!!!");
		navigate("/"); // Redirect to home or any other page
	};

	return (
		<header className="bg-purple-700 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">
					<Link to="/">Book My Show</Link>
				</h1>
				<nav>
					<ul className="flex space-x-4">
						{isLoggedIn ? (
							<>
								<li>
									<Link to="/mybookings" className="hover:underline">
										My Bookings
									</Link>
								</li>
								<li>
									<button
										onClick={handleLogout}
										className="hover:underline text-white bg-transparent border-0 cursor-pointer"
									>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/login" className="hover:underline">
										Login
									</Link>
								</li>
								<li>
									<Link to="/register" className="hover:underline">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
