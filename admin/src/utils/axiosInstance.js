import axios from "axios";
const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "production"
			? import.meta.env.VITE_API_URL_PROD // Use production URL in production mode
			: import.meta.env.VITE_API_URL_DEV, // Use development URL in development mode
});
console.log(import.meta.env.VITE_API_URL_DEV);
console.log(import.meta.env.VITE_API_URL_PROD);
console.log(import.meta.env.MODE);

// Adding a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
