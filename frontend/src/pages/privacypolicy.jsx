// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6">Privacy Policy</h1>

			<p className="mb-4">
				Your privacy is important to us. This privacy policy explains how we collect, use, and share information
				about you when you use our website, Event Manager.
			</p>

			<h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
			<p className="mb-4">We may collect the following types of information:</p>
			<ul className="list-disc list-inside mb-4">
				<li>
					Personal Information: Such as your name, email address, and phone number when you register or fill
					out a form.
				</li>
				<li>
					Usage Data: Information on how you use our website, which may include your IP address, browser type,
					and pages visited.
				</li>
				<li>Cookies: Small files stored on your device that help us improve your experience on our website.</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
			<p className="mb-4">We use the information we collect for the following purposes:</p>
			<ul className="list-disc list-inside mb-4">
				<li>To provide and maintain our service.</li>
				<li>To notify you about changes to our service.</li>
				<li>To allow you to participate in interactive features when you choose to do so.</li>
				<li>To provide customer support.</li>
				<li>To gather analysis or valuable information so that we can improve our service.</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-4">Sharing Your Information</h2>
			<p className="mb-4">
				We do not sell or rent your personal information to third parties. We may share your information with:
			</p>
			<ul className="list-disc list-inside mb-4">
				<li>Service providers who assist us in our operations.</li>
				<li>Law enforcement or regulatory authorities when required by law.</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-4">Security of Your Information</h2>
			<p className="mb-4">
				We take the security of your personal information seriously and use reasonable administrative,
				technical, and physical safeguards to protect it.
			</p>

			<h2 className="text-2xl font-semibold mt-4">Changes to This Privacy Policy</h2>
			<p className="mb-4">
				We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
				Privacy Policy on this page.
			</p>

			<h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
			<p className="mb-4">
				If you have any questions about this Privacy Policy, please contact us at{" "}
				<a href="mailto:support@eventmanager.com" className="text-purple-500 hover:underline">
					support@eventmanager.com
				</a>
				.
			</p>
		</div>
	);
};

export default PrivacyPolicy;
