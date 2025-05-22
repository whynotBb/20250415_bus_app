import { styled, Typography } from "@mui/material";
import { useAirInfoStore } from "../../stores/useAirInfoStore";
import { useWeatherFcst, useWeatherNcst } from "../../stores/useWeatherInfoStore";
import { useCurrentLocationStore } from "../../stores/useCurrentLocationStore";
const RegionTxt = styled(Typography)({});
const WeatherPage = () => {
	const { airInfo } = useAirInfoStore();
	console.log("WeatherPage - air info", airInfo);
	const { weatherNcstData } = useWeatherNcst();
	console.log("weatherNcstData", weatherNcstData);
	const { weatherFcstData } = useWeatherFcst();
	console.log("weatherFcstData", weatherFcstData);

	// 좌표 기준으로 주소 변환 : kakao : coord2address
	// 현위치 좌표 store 에서 가져오기
	const { currentLocation } = useCurrentLocationStore();
	console.log("현위치 좌표 store 에서 가져오기", currentLocation?.latitude, currentLocation?.longitude);

	return (
		<div>
			<RegionTxt></RegionTxt>
		</div>
	);
};

export default WeatherPage;
