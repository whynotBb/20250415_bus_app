import axios from "axios";
import { SEOUL_BUS_API_URL } from "../configs/mapConfig";

const api = axios.create({
	baseURL: SEOUL_BUS_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
