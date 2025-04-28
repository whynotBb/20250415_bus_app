import axios from "axios";
import { SEOUL_BUS_API_KEY } from "../configs/mapConfig";
import { GetStationsByPosResponse, ILocation, StationByUidItem, StationItem } from "../models/map";
import { XMLParser } from "fast-xml-parser";

export const getStationByCurrent = async (location: ILocation) => {
	console.log("getStationByCurrent", location);

	try {
		const response = await axios.get(`https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`, {
			params: {
				serviceKey: "n3zbZ++zACobqLxjpnF7be8B75BPXY4NbIggHE3dwiM908CKZKzxt9vBS/gWdeXm2aSlK8pw8thh64wgmu7Tug==",
				gpsLong: location.longitude,
				gpsLati: location.latitude,
				// numOfRows: 10,
				// pageNo: 1,
				_type: "json",
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch get stations by current : ${error}`);
	}
};

export const getStationsByPos = async (location: ILocation, radius: number): Promise<GetStationsByPosResponse<StationItem>> => {
	console.log("getStateion", location, radius);

	try {
		const response = await axios.get(`/api/api/rest/stationinfo/getStationByPos`, {
			// const response = await axios.get(`/.netlify/functions/getStationsByPos`, {
			params: {
				serviceKey: SEOUL_BUS_API_KEY,
				tmX: location.longitude,
				tmY: location.latitude,
				radius,
			},
			responseType: "text", //응답을 문자열로 받기
		});

		//json 으로 파싱
		const parser = new XMLParser();
		const json = parser.parse(response.data);
		return json;
	} catch (error) {
		throw new Error(`fail to fetch get stations by pos : ${error}`);
	}
};

export const getStationByUidItem = async (arsId: number): Promise<GetStationsByPosResponse<StationByUidItem>> => {
	try {
		const response = await axios.get("/api/api/rest/stationinfo/getStationByUid", {
			params: {
				serviceKey: SEOUL_BUS_API_KEY,
				arsId: arsId,
			},
		});
		//json 으로 파싱
		const parser = new XMLParser();
		const json = parser.parse(response.data);
		return json;
	} catch (error) {
		throw new Error(`fail to fetch get station by id : ${error}`);
	}
};
