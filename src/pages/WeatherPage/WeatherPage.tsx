import { Box, styled, Typography } from "@mui/material";
import useGetCoordToAddr from "../../hooks/useGetCoorToAddr";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import TodayWeather from "./components/TodayWeather";

const WeatherPageWr = styled(Box)({});
const RegionTxt = styled(Typography)({ padding: "20px" });

const geolocationOptions = {
	enableHighAccuracy: true,
	timeout: 1000 * 10,
	maximumAge: 1000 * 3600 * 24,
};
const WeatherPage = () => {
	// 현재위치 가져오기
	const { location } = useGeoLocation(geolocationOptions);
	console.log("weatherPage : coord", location);

	// 좌표 기준으로 주소 변환 : kakao : coord2address
	// location 값이 undefined 이 아닐때 호출하도록 수정
	const { data: currentAddr, isLoading: currentAddrLoading } = useGetCoordToAddr(location);
	console.log("kakao 주소 변환 결과", currentAddrLoading, currentAddr);

	return (
		<WeatherPageWr>
			{currentAddr !== undefined && <RegionTxt>{`${currentAddr.documents[0].address.region_2depth_name} ${currentAddr?.documents[0].address.region_3depth_name}`}</RegionTxt>}
			{location !== undefined && <TodayWeather location={location} />}
		</WeatherPageWr>
	);
};

export default WeatherPage;
