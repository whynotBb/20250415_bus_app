import { styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ILocation } from "../../../models/map";
import { convertWGS84ToTM } from "../../../utils/convertWGS84ToTM";
import Loading from "../../../common/components/Loading";
import { useEffect } from "react";
import useGetAirInfoStation from "../../../hooks/useGetAirInfoStation";
import useGetAirInfoByStation from "../../../hooks/useGetAirInfoByStation";
import { useAirInfoStore } from "../../../stores/useAirInfoStore";
import { convertWGS84ToNxy } from "../../../utils/convertWGS84ToNxy";
import useGetUltraSrtFcst from "../../../hooks/useGetUltraSrtFcst";

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
});
const WeatherBx = styled("div")({});
const AtmosphereBx = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
});
const AirGradeBar = styled("span")({
	display: "block",
	width: "100%",
	height: "5px",
	borderRadius: "10px",
	marginBottom: "5px",
	background: "#ddd",
	"&.airGrade_1": {
		background: "#64A8FF",
	},
	"&.airGrade_2": {
		background: "#6ED6A0",
	},
	"&.airGrade_3": {
		background: "#FFD966",
	},
	"&.airGrade_4": {
		background: "#FF6B6B",
	},
});
const BtnClose = styled("button")(({ theme }) => ({
	position: "absolute",
	width: "20px",
	height: "20px",
	top: "-10px",
	right: "-10px",
	background: "rgba(255,255,255,.8)",
	boxShadow: "1px 1px 6px 2px rgba(0, 0, 0, .1)",
	border: "1px solid #ddd",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	svg: {
		width: "12px",
		color: theme.palette.primary.main,
	},
}));

const SkyIcon = styled("div")({
	width: "40px",
	height: "40px",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	backgroundSize: "100%",
	backgroundImage: "url(/assets/weather_sunny.svg)",
	"&.sky_1": {
		backgroundImage: "url(/assets/weather_sunny.svg)",
	},
	"&.sky_3": {
		backgroundImage: "url(/assets/weather_cloudy.svg)",
	},
	"&.sky_4": {
		backgroundImage: "url(/assets/weather_cloudy_2.svg)",
	},
});

const WeatherWidget = ({ location }: { location: ILocation }) => {
	console.log("날씨위젯", location);
	// WGS84 -> TM 변환
	const { x, y } = convertWGS84ToTM(location.latitude, location.longitude);
	console.log("TM 좌표", { x, y });
	// tm 좌표를 이용하여 현위치에서 가까운 측정소 조회하기
	const { data: AirInfoStationData, isLoading } = useGetAirInfoStation(x, y);
	useEffect(() => {
		if (!isLoading) {
			console.log("AirInfoStationData", AirInfoStationData.response.body.items[0].stationName);
		}
	}, [AirInfoStationData]);
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
	const base_time = String(now.getHours()).padStart(2, "0") + "00";

	// 변환된 좌표를 이용하여 초단기실황 날씨 정보 조회
	const { data: ultraSrtData } = useGetUltraSrtFcst({ nx, ny, base_date, base_time });
	console.log("ultraSrtData", ultraSrtData);

	if (isLoading || airInfoDataIsLoading) return <Loading />;
	return (
		<WeatherWr>
			<BtnClose>
				<CloseIcon />
			</BtnClose>
			<WeatherBx>
				{/* sky case
				1. sky : 맑음(1), 구름많음(3), 흐림(4)
				2. 강수 PTY : 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)  */}
				<SkyIcon className={`sky sky_${ultraSrtData && ultraSrtData.header.resultCode === "00" && ultraSrtData.body.items.item?.find((item) => item.category === "SKY")?.fcstValue}`} />
				<p>{ultraSrtData && ultraSrtData.header.resultCode === "00" && ultraSrtData.body.items.item?.find((item) => item.category === "T1H")?.fcstValue}℃</p>
			</WeatherBx>
			<AtmosphereBx>
				<div>
					<AirGradeBar className={` airGrade_${airInfo?.items ? airInfo.items[0].pm10Grade : 0}`} />
					<p>미세</p>
				</div>
				<div>
					<AirGradeBar className={`airGrade_${airInfo?.items ? airInfo.items[0].pm10Grade : 0}`} />
					<p>초미세</p>
				</div>
			</AtmosphereBx>
		</WeatherWr>
	);
};

export default WeatherWidget;
