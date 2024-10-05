// src/pages/Register.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.post("/register", { name, email, password });
			navigate("/login");
		} catch (error) {
			console.error("Error registering:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Register</h1>
			<form onSubmit={handleRegister}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					className="mb-4 p-2 border"
					required
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="mb-4 p-2 border"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="mb-4 p-2 border"
					required
				/>
				<button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
