// src/pages/Register.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null); // Reset error state
		try {
			await axiosInstance.post("auth/register", { name, email, password });
			toast.success("User Registered Succesfully");
			navigate("/login");
		} catch (error) {
			setError("Registration failed. Please try again."); // Set error message
			toast.error("Error registering:", error);
		}
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
				<h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Register</h1>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error Message */}
				<form onSubmit={handleRegister}>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
						required
					/>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
						required
					/>
					<button
						type="submit"
						className="bg-purple-500 text-white py-3 rounded w-full hover:bg-purple-600 transition-colors duration-200"
					>
						Register
					</button>
				</form>
				<p className="text-center text-gray-600 mt-4">
					Already have an account?{" "}
					<a href="/login" className="text-purple-500 hover:underline">
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
