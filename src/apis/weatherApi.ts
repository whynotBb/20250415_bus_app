import axios from "axios";
import { AirInfoDataResponse } from "../models/airInfo";
import { CoordToAddrRes, MidFcstReq, MidFcstRes, OpenWeatherCurrentReq, OpenWeatherForecastReq, UltraSrtFcstRes, UltraSrtNcstReq, UltraSrtNcstRes } from "../models/weather";
import { ILocation } from "../models/map";
import { OPEN_WEATHER_API_KEY } from "../configs/mapConfig";

/**
 * 가까운 측정소 찾기
 * @param x
 * @param y
 * @returns
 */
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

/**
 * 측정소 기준 대기 정보
 * @param stationName
 * @returns
 */
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

/**
 * 초단기 실황조회
 * @param params
 * @returns
 */
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

/**
 * 초단기 예보 조회
 * @param params
 * @returns
 */
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
 * 단기 예보
 * @param params
 * @returns
 */
export const getVilageFcst = async (params: UltraSrtNcstReq) => {
	const { nx, ny, base_date, base_time } = params;
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getVilageFcst`, {
			params: {
				nx: nx,
				ny: ny,
				base_date: base_date,
				base_time: base_time,
			},
		});
		const result = response.data?.response;

		if (!result) {
			throw new Error("No response data from API");
		}

		console.log("단기 예보 호출 -", result);
		return result;
	} catch (error) {
		throw new Error(`fail to fetch vilage fcst : ${error}`);
	}
};

/**
 * x,y 좌표를 주소로 변환하는 api(kakao)
 * @param location
 */
export const getCoordToAddr = async (location: ILocation | undefined): Promise<CoordToAddrRes> => {
	console.log("getCoordToAddr : location", location);
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

export const getMidLandFcst = async (params: MidFcstReq): Promise<MidFcstRes> => {
	try {
		const response = await axios.get(`https://bus-proxy-server.vercel.app/api/getMidLandFcst`, {
			params: {
				regId: params.regId,
				tmFc: params.tmFc,
			},
		});
		console.log("getMidLandFcst res", response.data);

		return response.data;
	} catch (error) {
		throw new Error(`fail to get mid land fcst : ${error}`);
	}
};

export const getOpenWeatherForecast = async (params: ILocation): Promise<OpenWeatherForecastReq> => {
	console.log("예보", params);

	const APIKEY = OPEN_WEATHER_API_KEY;
	try {
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${params.latitude}&lon=${params.longitude}&appid=${APIKEY}&units=metric&lang=kr`);
		return response.data;
	} catch (error) {
		throw new Error(`fail to get open weather : ${error}`);
	}
};
export const getOpenWeatherCurrent = async (params: ILocation): Promise<OpenWeatherCurrentReq> => {
	console.log("current", params);

	const APIKEY = OPEN_WEATHER_API_KEY;
	try {
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${params.latitude}&lon=${params.longitude}&appid=${APIKEY}&units=metric&lang=kr`);
		return response.data;
	} catch (error) {
		throw new Error(`fail to get open weather : ${error}`);
	}
};
