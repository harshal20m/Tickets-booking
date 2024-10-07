const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-4 mt-6">
			<div className="container mx-auto text-center">
				<p className="text-sm">&copy; {new Date().getFullYear()} Event Manager. All rights reserved.</p>
				<p className="text-sm">
					<a href="/privacy-policy" className="text-purple-500 hover:underline">
						Privacy Policy
					</a>
					{" | "}
					<a href="/terms" className="text-purple-500 hover:underline">
						Terms of Service
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
