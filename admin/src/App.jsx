// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import CreateEvent from "./pages/CreateEvent";
// import EditEvent from "./pages/EditEvent";
// import Login from "./pages/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast
// import { useEffect, useState } from "react";
// import axiosInstance from "./utils/axiosInstance";
// import Loader from "./components/Loader";

// function App() {
// 	const [loading, setLoading] = useState(false);
// 	useEffect(() => {
// 		//request interceptor

// 		axiosInstance.interceptors.request.use(
// 			(config) => {
// 				setLoading(true);
// 				return config;
// 			},
// 			(error) => {
// 				return Promise.reject(error);
// 			}
// 		);
// 		//response interceptor
// 		axiosInstance.interceptors.response.use(
// 			(config) => {
// 				console.log("respoonse worked");
// 				setLoading(false);
// 				return config;
// 			},
// 			(error) => {
// 				return Promise.reject(error);
// 			}
// 		);
// 	}, []);

// 	return (
// 		<Router>
// 			<Loader show={loading} />
// 			<ToastContainer />
// 			<Routes>
// 				<Route path="/admin/login" element={<Login />} />
// 				<Route
// 					path="/admin/dashboard"
// 					element={
// 						<ProtectedRoute>
// 							<AdminDashboard />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path="/admin/event/new"
// 					element={
// 						// <ProtectedRoute>
// 						<CreateEvent />
// 						// </ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path="/admin/event/edit/:id"
// 					element={
// 						<ProtectedRoute>
// 							<EditEvent />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				{/* Add a catch-all route for debugging */}
// 				<Route path="*" element={<Login />} />
// 			</Routes>
// 		</Router>
// 	);
// }
// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast
import axiosInstance from "./utils/axiosInstance";
import Loader from "./components/Loader";

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
			<Loader show={loading} />
			<ToastContainer />
			{!loading && ( // Render routes only when not loading
				<Routes>
					<Route path="/admin/login" element={<Login />} />
					<Route
						path="/admin/dashboard"
						element={
							<ProtectedRoute>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/event/new"
						element={<CreateEvent />} // Removed commented-out ProtectedRoute
					/>
					<Route
						path="/admin/event/edit/:id"
						element={
							<ProtectedRoute>
								<EditEvent />
							</ProtectedRoute>
						}
					/>
					{/* Add a catch-all route for debugging */}
					<Route path="*" element={<Login />} />
				</Routes>
			)}
		</Router>
	);
}

export default App;
