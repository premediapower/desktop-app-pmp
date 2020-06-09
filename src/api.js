import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://premediapower.com/spa/",
	withCredentials: true
	// headers: {
	// 	'Accept-Version': 1,
	// 	'Accept': 'application/json',
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Content-Type': 'application/json; charset=utf-8',
	// },
	// responseType: 'json'
	// required to handle the CSRF token
});

apiClient.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});

export default apiClient;
