// src/App.jsx
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

function App() {
	return (
		<Router>
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/event/:id" element={<EventDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/events/:id" element={<EventDetails />} />
				<Route path="/my-bookings" element={<MyBookings />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
