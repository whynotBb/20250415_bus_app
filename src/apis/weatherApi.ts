import axios from "axios";
import { AirInfoDataResponse } from "../models/airInfo";
import { CoordToAddrRes, UltraSrtFcstRes, UltraSrtNcstReq, UltraSrtNcstRes } from "../models/weather";
import { ILocation } from "../models/map";
// 가까운 측정소 찾기
export const getAirInfoStation = async (x: number, y: number) => {
	console.log("xy !!??", x, y);

	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getAirInfoStation`, {
			params: {
				tmX: x,
				tmY: y,
			},
		});
		// console.log("!!here!!", response.data);

		return response.data;
	} catch (error) {
		throw new Error(`fail to fetch get weather station : ${error}`);
	}
};

// 측정소 기준 대기 정보
export const getAirInfoByStation = async (stationName: string): Promise<AirInfoDataResponse> => {
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getAirInfoByStation`, {
			params: {
				stationName: stationName,
			},
		});
		return response.data.response.body;
	} catch (error) {
		throw new Error(`fail to fetch get air info by station : ${error}`);
	}
};

// 초단기 실황조회

export const getUltraSrtNcst = async (params: UltraSrtNcstReq): Promise<UltraSrtNcstRes> => {
	const { nx, ny, base_date, base_time } = params;
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getUltraSrtNcst`, {
			params: {
				nx: nx,
				ny: ny,
				base_date: base_date,
				base_time: base_time,
			},
		});
		console.log(response.data);

		return response.data.response;
	} catch (error) {
		throw new Error(`fail to fetch ultra srt ncst : ${error}`);
	}
};

// 초단기 예보 조회

export const getUltraSrtFcst = async (params: UltraSrtNcstReq): Promise<UltraSrtFcstRes> => {
	const { nx, ny, base_date, base_time } = params;
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getUltraSrtFcst`, {
			params: {
				nx: nx,
				ny: ny,
				base_date: base_date,
				base_time: base_time,
			},
		});
		console.log(response.data);

		return response.data.response;
	} catch (error) {
		throw new Error(`fail to fetch ultra srt fcst : ${error}`);
	}
};

/**
 * x,y 좌표를 주소로 변환하는 api(kakao)
 * @param location
 */
export const getCoordToAddr = async (location: ILocation | null): Promise<CoordToAddrRes> => {
	if (!location) {
		throw new Error("Location is null. Cannot convert coordinates to address.");
	}
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getCoordToAddr`, {
			params: {
				x: location.longitude,
				y: location.latitude,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(`fail to coord to Address : ${error}`);
	}
};
