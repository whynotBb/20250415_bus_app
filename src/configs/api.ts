import axios from "axios";
// import { SEOUL_BUS_API_URL } from "../configs/mapConfig";

const api = axios.create({
	// baseURL: SEOUL_BUS_API_URL,
	baseURL: "https://bus-proxy-server.vercel.app/api",
	// headers: {
	// 	"Content-Type": "application/json",
	// },
});

export default api;
