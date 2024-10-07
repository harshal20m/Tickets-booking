// src/pages/TermsOfService.jsx
import React from "react";

const TermsOfService = () => {
	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold text-purple-700 mb-6">Terms of Service</h1>

			<p className="mb-4">
				Welcome to Event Manager! By using our services, you agree to the following terms and conditions.
			</p>

			<h2 className="text-2xl font-semibold mt-4">1. Acceptance of Terms</h2>
			<p className="mb-4">
				By accessing or using our services, you agree to comply with and be bound by these terms. If you do not
				agree with any part of these terms, you must not use our services.
			</p>

			<h2 className="text-2xl font-semibold mt-4">2. Changes to Terms</h2>
			<p className="mb-4">
				Event Manager reserves the right to modify these terms at any time. We will notify you of changes by
				posting the new terms on this page. Your continued use of our services after changes are made
				constitutes your acceptance of the new terms.
			</p>

			<h2 className="text-2xl font-semibold mt-4">3. User Responsibilities</h2>
			<p className="mb-4">
				You agree to use our services only for lawful purposes and in accordance with these terms. You are
				responsible for any content you submit and must not post any illegal, harmful, or offensive content.
			</p>

			<h2 className="text-2xl font-semibold mt-4">4. Account Security</h2>
			<p className="mb-4">
				You are responsible for maintaining the confidentiality of your account information and for all
				activities that occur under your account. If you believe your account has been compromised, you must
				notify us immediately.
			</p>

			<h2 className="text-2xl font-semibold mt-4">5. Limitation of Liability</h2>
			<p className="mb-4">
				Event Manager shall not be liable for any indirect, incidental, special, consequential, or punitive
				damages arising out of your use of our services.
			</p>

			<h2 className="text-2xl font-semibold mt-4">6. Governing Law</h2>
			<p className="mb-4">
				These terms shall be governed by and construed in accordance with the laws of your jurisdiction, without
				regard to its conflict of law principles.
			</p>

			<h2 className="text-2xl font-semibold mt-4">7. Contact Us</h2>
			<p className="mb-4">
				If you have any questions about these Terms of Service, please contact us at{" "}
				<a href="mailto:support@eventmanager.com" className="text-purple-500 hover:underline">
					support@eventmanager.com
				</a>
				.
			</p>
		</div>
	);
};

export default TermsOfService;
