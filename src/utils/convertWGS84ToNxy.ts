import { ILocation } from "../models/map";

interface NxNy {
	nx: number;
	ny: number;
}

/**
 * WGS84 → 격자 좌표 변환 함수
 * @param location
 * @returns
 */
export const convertWGS84ToNxy = (location: ILocation): NxNy => {
	const RE = 6371.00877; // 지구 반경(km)
	const GRID = 5.0; // 격자 간격(km)
	const SLAT1 = 30.0; // 투영 위도1(degree)
	const SLAT2 = 60.0; // 투영 위도2(degree)
	const OLON = 126.0; // 기준점 경도(degree)
	const OLAT = 38.0; // 기준점 위도(degree)
	const XO = 43; // 기준점 X좌표(GRID)
	const YO = 136; // 기준점 Y좌표(GRID)

	const DEGRAD = Math.PI / 180.0;

	const re = RE / GRID;
	const slat1 = SLAT1 * DEGRAD;
	const slat2 = SLAT2 * DEGRAD;
	const olat = OLAT * DEGRAD;

	let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
	sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
	let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
	sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

	let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
	ro = (re * sf) / Math.pow(ro, sn);

	const ra = Math.tan(Math.PI * 0.25 + location.latitude * DEGRAD * 0.5);
	const r = (re * sf) / Math.pow(ra, sn);

	const theta = (location.longitude - OLON) * DEGRAD * sn;

	const nx = Math.floor(r * Math.sin(theta) + XO + 0.5);
	const ny = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);

	return { nx, ny };
};
