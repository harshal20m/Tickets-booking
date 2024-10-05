// src/pages/Login.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/login", { email, password });
			localStorage.setItem("token", response.data.token);
			navigate("/");
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Login</h1>
			<form onSubmit={handleLogin}>
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
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
