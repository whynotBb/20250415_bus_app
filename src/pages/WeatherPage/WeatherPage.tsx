import { useAirInfoStationAddrStore, useAirInfoStore } from "../../stores/useAirInfoStore";
import { useWeatherFcst, useWeatherNcst } from "../../stores/useWeatherInfoStore";

const WeatherPage = () => {
	const { airInfo } = useAirInfoStore();
	console.log("WeatherPage - air info", airInfo);
	const { weatherNcstData } = useWeatherNcst();
	console.log("weatherNcstData", weatherNcstData);
	const { weatherFcstData } = useWeatherFcst();
	console.log("weatherFcstData", weatherFcstData);

	// 측정소 정보 가져와서 행정구역 추출하기
	const { airInfoStationAddr } = useAirInfoStationAddrStore();
	console.log("airInfoStationAddr", airInfoStationAddr?.split(" ")[0]);

	return <div></div>;
};

export default WeatherPage;
