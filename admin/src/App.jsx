import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for toast

function App() {
	return (
		<Router>
			<ToastContainer />
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
					element={
						// <ProtectedRoute>
						<CreateEvent />
						// </ProtectedRoute>
					}
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
		</Router>
	);
}
export default App;
