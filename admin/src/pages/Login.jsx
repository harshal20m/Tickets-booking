import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/auth/login", { email, password });
			localStorage.setItem("token", response.data.token);
			toast.success("Welcome");
			navigate("/admin/dashboard");
		} catch (error) {
			toast.error("wrong password or email");
			console.error("Error logging in:", error);
		}
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
				<h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Admin Login</h1>
				<form onSubmit={handleLogin}>
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
						className="bg-purple-500 text-white py-3 rounded w-full hover:bg-purple-600 transition duration-200"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
