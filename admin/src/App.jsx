import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./utils/axiosInstance";
import Loader from "./components/Loader";

function App() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const requestInterceptor = axiosInstance.interceptors.request.use(
			(config) => {
				setLoading(true);
				return config;
			},
			(error) => {
				setLoading(false);
				return Promise.reject(error);
			}
		);

		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => {
				setLoading(false);
				return response;
			},
			(error) => {
				setLoading(false);
				return Promise.reject(error);
			}
		);

		return () => {
			axiosInstance.interceptors.request.eject(requestInterceptor);
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, []);

	return (
		<Router>
			<ToastContainer />
			<Loader show={loading} />

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
				<Route path="/admin/event/new" element={<CreateEvent />} />
				<Route
					path="/admin/event/edit/:id"
					element={
						<ProtectedRoute>
							<EditEvent />
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
