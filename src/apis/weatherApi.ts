import axios from "axios";
import { SEOUL_BUS_API_KEY } from "../configs/mapConfig";
import { AirInfoDataResponse } from "../models/airInfo";
import { ILocation } from "../models/map";

export const getAirInfoStation = async (x: number, y: number) => {
	console.log("xy !!??", x, y);

	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getAirInfoStation`, {
			params: {
				// serviceKey: SEOUL_BUS_API_KEY,
				// returnType: "json",
				tmX: x,
				tmY: y,
			},
		});
		console.log("!!here!!", response.data);

		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch get weather station : ${error}`);
	}
};

// 측정소 기준 대기 정보
export const getAirInfoByStation = async (stationName: string): Promise<AirInfoDataResponse> => {
	try {
		const response = await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`, {
			params: {
				serviceKey: SEOUL_BUS_API_KEY,
				returnType: "json",
				stationName: stationName,
				dataTerm: "DAILY",
				numOfRows: 1,
				ver: "1.4", //pm25포함
			},
		});
		return response.data.response.body;
	} catch (error) {
		throw new Error(`fail to fetch get air info by station : ${error}`);
	}
};

// 초단기 실황조회

export const getUltraSrtNcst = async (location: ILocation) => {
	try {
		const response = await axios.get(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`, {
			params: {
				serviceKey: SEOUL_BUS_API_KEY,
				returnType: "json",
				nx: location.latitude,
				ny: location.longitude,
				pageNo: "1",
				numOfRows: "10",
				base_date: "20250515",
				base_time: "1700",
			},
		});
		console.log(response.data);

		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch ultra srt ncst : ${error}`);
	}
};
