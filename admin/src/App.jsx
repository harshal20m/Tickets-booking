// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
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
						<ProtectedRoute>
							<CreateEvent />
						</ProtectedRoute>
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
			</Routes>
		</Router>
	);
}

export default App;
