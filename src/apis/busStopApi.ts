import axios from "axios";
import { GetStationsByPosResponse, ILocation, StationByUidItem, StationItem } from "../models/map";

/**
 * 현재위치 기준 반경(radius) 內 버스정류장 정보 불러오기
 * @param location
 * @param radius
 * @returns
 */
export const getStationsByPos = async (location: ILocation, radius: number): Promise<GetStationsByPosResponse<StationItem>> => {
	console.log("getStateion", location, radius);

	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getStationsByPos`, {
			params: {
				tmX: location.longitude,
				tmY: location.latitude,
				radius,
			},
		});

		console.log("getStationsByPos data !!!", response.data);

		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch get stations by pos : ${error}`);
	}
};

/**
 * 해당 버스 정류장의 정보(정류장 정보, 도착 버스 정보)
 * @param arsId 정류장 id
 * @returns
 */
export const getStationByUidItem = async (arsId: number): Promise<GetStationsByPosResponse<StationByUidItem>> => {
	console.log("getStationByUidItem : 정류장정보 가져오기 api 호출! : arsId는?", arsId);
	if (arsId === 0) {
		throw new Error("Invalid arsId: 0. API call skipped.");
	}
	try {
		const response = await axios.get("https://bus-proxy-server.vercel.app/api/getStationByUid", {
			params: {
				arsId: arsId,
			},
		});
		console.log("getStationByUidItem data !!!", response.data);
		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch get station by id : ${error}`);
	}
};
