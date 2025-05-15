import proj4 from "proj4";

// EPSG:5174 정의 추가 (TM 중부)
proj4.defs("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +datum=WGS84 +units=m +no_defs");

// 좌표 변환 함수
export const convertWGS84ToTM = (lat: number, lon: number) => {
	// WGS84 좌표계 (EPSG:4326)
	const WGS84 = "EPSG:4326";
	// TM 중부 (EPSG:5174)
	const TM = "EPSG:5174";

	// 좌표 변환
	const [x, y] = proj4(WGS84, TM, [lon, lat]);

	return { x, y };
};
