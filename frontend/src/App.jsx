// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import EventDetails from "./pages/EventDetails";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import MyBookings from "./pages/MyBookings";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast
// import Payment from "./pages/Payment";

// function App() {
// 	return (
// 		<Router>
// 			<ToastContainer />
// 			<Navbar />
// 			<Routes>
// 				<Route path="/" element={<Home />} />
// 				<Route path="/event/:id" element={<EventDetails />} />
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/register" element={<Register />} />
// 				<Route path="/events/:id" element={<EventDetails />} />
// 				<Route path="/mybookings" element={<MyBookings />} />
// 				<Route path="/payment" element={<Payment />} />
// 			</Routes>
// 			<Footer />
// 		</Router>
// 	);
// }

// export default App;

// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast
import Payment from "./pages/Payment";
import Loader from "./Components/Loader"; // Import your Loader component
import axiosInstance from "./utils/axiosInstance"; // Import your axios instance

function App() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Request interceptor
		const requestInterceptor = axiosInstance.interceptors.request.use(
			(config) => {
				setLoading(true);
				return config;
			},
			(error) => {
				setLoading(false); // Hide loader on error
				return Promise.reject(error);
			}
		);

		// Response interceptor
		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => {
				setLoading(false);
				return response;
			},
			(error) => {
				setLoading(false); // Hide loader on error
				return Promise.reject(error);
			}
		);

		// Cleanup interceptors on component unmount
		return () => {
			axiosInstance.interceptors.request.eject(requestInterceptor);
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, []);

	return (
		<Router>
			<ToastContainer />
			<Navbar />
			<Loader show={loading} /> {/* Show loader if loading is true */}
			{!loading && ( // Render routes only when not loading
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/event/:id" element={<EventDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/events/:id" element={<EventDetails />} />
					<Route path="/mybookings" element={<MyBookings />} />
					<Route path="/payment" element={<Payment />} />
				</Routes>
			)}
			<Footer />
		</Router>
	);
}

export default App;
