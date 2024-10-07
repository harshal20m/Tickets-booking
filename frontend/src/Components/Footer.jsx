import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-4 mt-6">
			<div className="container mx-auto text-center">
				<p className="text-sm">&copy; {new Date().getFullYear()} Event Manager. All rights reserved.</p>
				<p className="text-sm">
					<Link to="/privacy-policy" className="text-purple-500 hover:underline">
						Privacy Policy
					</Link>
					{" | "}
					<Link to="/terms" className="text-purple-500 hover:underline">
						Terms of Service
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
