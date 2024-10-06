// src/components/Loader.jsx
import "./Loader.css"; // Import the CSS file

const Loader = ({ show }) => {
	return (
		show && (
			<div className="loader-container">
				<div className="loader"></div>
			</div>
		)
	);
};

export default Loader;
