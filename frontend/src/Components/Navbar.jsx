// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const isLoggedIn = !!localStorage.getItem("token"); // Check login status

	return (
		<header className="bg-purple-700 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">
					<Link to="/">Book My Show</Link>
				</h1>
				<nav>
					<ul className="flex space-x-4">
						{isLoggedIn && (
							<li>
								<Link to="/my-bookings" className="hover:underline">
									My Bookings
								</Link>
							</li>
						)}
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
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
