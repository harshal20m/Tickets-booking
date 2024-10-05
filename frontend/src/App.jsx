// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/event/:id" element={<EventDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
