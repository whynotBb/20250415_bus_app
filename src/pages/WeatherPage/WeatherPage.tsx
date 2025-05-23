import { Box, styled, Typography } from "@mui/material";
import { useAirInfoStore } from "../../stores/useAirInfoStore";
import { useWeatherFcst, useWeatherNcst } from "../../stores/useWeatherInfoStore";
import { useCurrentLocationStore } from "../../stores/useCurrentLocationStore";
import useGetCoordToAddr from "../../hooks/useGetCoorToAddr";

const WeatherPageWr = styled(Box)({
	padding: "20px",
});
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
	// currentLocation 값이 null 이 아닐때 호출하도록 수정
	const { data: currentAddr } = useGetCoordToAddr(currentLocation);

	console.log("kakao 주소 변환 결과", currentAddr);
	return (
		<WeatherPageWr>
			<RegionTxt>{`${currentAddr?.documents[0].address.region_2depth_name} ${currentAddr?.documents[0].address.region_3depth_name}`}</RegionTxt>
		</WeatherPageWr>
	);
};

export default WeatherPage;
