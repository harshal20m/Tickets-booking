import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./pages/Payment";
import Loader from "./Components/Loader";
import axiosInstance from "./utils/axiosInstance";
import PrivacyPolicy from "./pages/privacypolicy";
import TermsOfService from "./pages/Termsofservice";

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
			<Navbar />
			<Loader show={loading} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/event/:id" element={<EventDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/events/:id" element={<EventDetails />} />
				<Route path="/mybookings" element={<MyBookings />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms" element={<TermsOfService />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
