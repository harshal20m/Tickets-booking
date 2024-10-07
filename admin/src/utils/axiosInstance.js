import axios from "axios";
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL_PROD,
});

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

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				localStorage.removeItem("token");
				window.location.href = "/login";
			} else if (error.response.status === 403) {
				console.error("Access forbidden.");
			} else if (error.response.status === 500) {
				console.error("Internal Server Error.");
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
