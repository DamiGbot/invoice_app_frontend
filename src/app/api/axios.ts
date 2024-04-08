import axios from "axios";

const apiInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_V1,
});

export default apiInstance;
