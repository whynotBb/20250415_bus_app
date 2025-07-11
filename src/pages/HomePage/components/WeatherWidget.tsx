import { styled } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { ILocation } from "../../../models/map";
import { convertWGS84ToTM } from "../../../utils/convertWGS84ToTM";
import Loading from "../../../common/components/Loading";
import { useEffect } from "react";
import useGetAirInfoStation from "../../../hooks/useGetAirInfoStation";
import useGetAirInfoByStation from "../../../hooks/useGetAirInfoByStation";
import { useAirInfoStore } from "../../../stores/useAirInfoStore";
import { convertWGS84ToNxy } from "../../../utils/convertWGS84ToNxy";
import useGetUltraSrtFcst from "../../../hooks/useGetUltraSrtFcst";
import { useNavigate } from "react-router-dom";
import useGetUltraSrtNcst from "../../../hooks/useGetUltraSrtNcst";
import { useWeatherFcst, useWeatherNcst } from "../../../stores/useWeatherInfoStore";
import AtmosphereBx from "../../../common/components/AtmosphereBx";
import SkyIconBx from "../../../common/components/SkyIconBx";
import { getValueByCategory } from "../../../utils/weatherConvert";

const WeatherWr = styled("div")({
	position: "absolute",
	top: "80px",
	right: "20px",
	background: "rgba(255,255,255,.6)",
	color: "#666",
	padding: "10px",
	border: "1px solid #ddd",
	borderRadius: "10px",
	boxShadow: "1px 1px 6px 2px rgba(0, 0, 0, .1)",
	fontSize: "14px",
	display: "flex",
	alignItems: "center",
	gap: "4px",
	textAlign: "center",
	flexDirection: "column",
	cursor: "pointer",
});
const WeatherBx = styled("div")({});

// sky case
// 1. sky : 맑음(1), 구름많음(3), 흐림(4)
// 2. 강수 PTY : 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
// const SkyIcon = styled("div")({
// 	width: "40px",
// 	height: "40px",
// 	backgroundRepeat: "no-repeat",
// 	backgroundPosition: "center",
// 	backgroundSize: "100%",
// 	// backgroundImage: "url(/assets/weather_sunny.svg)",

// 	"&.sky_1": {
// 		backgroundImage: "url(/assets/weather_sunny.svg)",
// 	},
// 	"&.sky_3": {
// 		backgroundImage: "url(/assets/weather_cloudy.svg)",
// 	},
// 	"&.sky_4": {
// 		backgroundImage: "url(/assets/weather_cloudy_2.svg)",
// 	},
// 	"&.pty_1": {
// 		backgroundImage: "url(/assets/weather_rain.svg)",
// 	},
// 	"&.pty_2": {
// 		backgroundImage: "url(/assets/weather_rain.svg)",
// 	},
// 	"&.pty_3": {
// 		backgroundImage: "url(/assets/weather_snow.svg)",
// 	},
// });

const WeatherWidget = ({ location }: { location: ILocation }) => {
	const navigate = useNavigate();
	const goToWeatherPage = () => {
		navigate("/weather");
	};
	console.log("날씨위젯", location);
	// WGS84 -> TM 변환
	const { x, y } = convertWGS84ToTM(location.latitude, location.longitude);
	console.log("일반 x, y", location.latitude, location.longitude, "TM 좌표", { x, y });
	// tm 좌표를 이용하여 현위치에서 가까운 측정소 조회하기
	const { data: AirInfoStationData, isLoading } = useGetAirInfoStation(x, y);
	// 측정소 주소 저장(중기예보 조회를 위함)
	// → 현위치 좌표 > 주소 변환할 예정으로 아래 코드 제거
	// const { setAirInfoStationAddr } = useAirInfoStationAddrStore();
	// useEffect(() => {
	// 	if (!isLoading) {
	// 		console.log("AirInfoStationData", AirInfoStationData.response.body.items[0].stationName);
	// 		setAirInfoStationAddr(AirInfoStationData.response.body.items[0].addr);
	// 	}
	// }, [AirInfoStationData]);

	// 가까운 측정소기준의 대기(미먼,초미먼) 상태 조회하기
	const { data: airInfoData, isLoading: airInfoDataIsLoading } = useGetAirInfoByStation(AirInfoStationData?.response.body.items[0].stationName);
	console.log("airInfoData", airInfoData?.items);
	const { airInfo, setAirInfo } = useAirInfoStore();
	useEffect(() => {
		if (airInfoData) {
			setAirInfo(airInfoData);
		}
	}, [airInfoData, setAirInfo]);
	console.log("!!!!!!!", airInfo);

	// WGS84 > 격자 좌표계 변환해서
	const { nx, ny } = convertWGS84ToNxy(location);
	console.log("convertWGS84ToNxy", nx, ny);

	// base date, time 계산하기
	const now = new Date();

	const base_date = now.toISOString().slice(0, 10).replace(/-/g, "");

	// base_time : 30분 단위
	let hour = now.getMinutes() >= 30 ? now.getHours() : now.getHours() - 1;
	// 자정(0시)일 때 hour가 -1이 되지 않도록 보정
	if (hour < 0) hour = 23;
	const base_time = String(hour).padStart(2, "0") + "30";

	// base_time_10 : 10분 단위 (단기실황)
	hour = now.getMinutes() >= 10 ? now.getHours() : now.getHours() - 1;
	// 자정(0시)일 때 hour가 -1이 되지 않도록 보정
	if (hour < 0) hour = 23;
	const base_time_10 = String(hour).padStart(2, "0") + "00";

	// 변환된 좌표를 이용하여 초단기예보 날씨 정보 조회
	const { data: ultraSrtNcstData } = useGetUltraSrtNcst({ nx, ny, base_date, base_time: base_time_10 });
	const { data: ultraSrtData } = useGetUltraSrtFcst({ nx, ny, base_date, base_time });
	console.log("ultraSrtData", ultraSrtData, "ultraSrtNcstData : ", ultraSrtNcstData);

	// 초단기 실황
	const { setWeatherNcst } = useWeatherNcst();
	useEffect(() => {
		if (ultraSrtNcstData) {
			setWeatherNcst(ultraSrtNcstData);
		}
	}, [ultraSrtNcstData, setWeatherNcst]);
	// 초단기 예보
	const { setWeatherFcst } = useWeatherFcst();
	useEffect(() => {
		if (ultraSrtData) {
			setWeatherFcst(ultraSrtData);
		}
	}, [ultraSrtData, setWeatherFcst]);

	if (isLoading || airInfoDataIsLoading) return <Loading />;
	return (
		<WeatherWr onClick={goToWeatherPage}>
			<WeatherBx>
				{ultraSrtData !== undefined && ultraSrtData.header.resultCode === "00" && <SkyIconBx ultraSrtData={ultraSrtData} />}

				{/* <p>{`${ultraSrtNcstData && ultraSrtNcstData.header.resultCode === "00" && getValueByCategory(ultraSrtNcstData, "T1H")}℃`}</p> */}
				{/* false 로 return 되는 현상 대응 test */}
				<p>{`${ultraSrtNcstData?.header?.resultCode === "00" && (getValueByCategory(ultraSrtNcstData, "T1H") ?? "")}℃`}</p>
			</WeatherBx>
			{airInfo && <AtmosphereBx airInfo={airInfo} />}
		</WeatherWr>
	);
};

export default WeatherWidget;
