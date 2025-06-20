import { Box, Grid, styled } from "@mui/material";
import { ILocation } from "../../../models/map";
import useGetAirInfoStation from "../../../hooks/useGetAirInfoStation";
import { convertWGS84ToTM } from "../../../utils/convertWGS84ToTM";
import useGetAirInfoByStation from "../../../hooks/useGetAirInfoByStation";
import { convertWGS84ToNxy } from "../../../utils/convertWGS84ToNxy";
import useGetUltraSrtNcst from "../../../hooks/useGetUltraSrtNcst";
import useGetUltraSrtFcst from "../../../hooks/useGetUltraSrtFcst";
import { getValueByCategory, skyCodeToTxt, vilageBaseTime } from "../../../utils/weatherConvert";
import SkyIconBx from "../../../common/components/SkyIconBx";
import useGetVilageFcst from "../../../hooks/useGetVilageFcst";
import TodayWeatherDetailSlider from "./TodayWeatherDetailSlider";
import { UltraSrtFcstItem, UltraSrtFcstRes, UltraSrtNcstRes } from "../../../models/weather";
import VilageWeatherSlider from "./VilageWeatherSlider";
import useGetOpenWeatherForecast from "../../../hooks/useGetOpenWeatherForecast";

const TodayWeatherWr = styled(Box)({});
const TodayBx = styled(Grid)({
	".sky_icon": {
		width: "100px",
		height: "100px",
		position: "relative",
		textAlign: "center",
		paddingTop: "45px",
		".sky, .pty": {
			position: "absolute",
			top: "4px",
			left: "4px",
			width: "50px",
			height: "50px",
		},
		b: {
			fontSize: "26px",
		},
	},
	ul: {
		fontSize: "14px",
		display: "flex",
		alignItems: "center",
		gap: "4px",
	},
});

/**
 * 오늘 기온 - 어제 기온 : 온도 / 화살표 up, down 표기
 * @param todayData
 * @param yesterdayData
 * @returns
 */
const renderTempDiff = (todayData: UltraSrtNcstRes, yesterdayData: UltraSrtNcstRes) => {
	const today = Number(getValueByCategory(todayData, "T1H"));
	const yesterday = Number(getValueByCategory(yesterdayData, "T1H"));

	if (today === null || yesterday === null) return null;

	const diff = today - yesterday;
	const absDiff = Math.abs(diff).toFixed(1); // 소수 1자리

	let className = "";
	let arrow = "-";

	if (diff > 0) {
		className = "up";
		arrow = "↑";
	} else if (diff < 0) {
		className = "down";
		arrow = "↓";
	}

	return (
		<li className={className}>
			어제보다 {absDiff}˚ {arrow}
		</li>
	);
};

/**
 * sky 코드 > 텍스트 변환
 * @param ultraSrtData
 * @returns
 */
const renderSkyTxt = (ultraSrtData: UltraSrtFcstRes) => {
	const items = ultraSrtData.body.items.item;
	let result = "";
	if (items.find((item) => item.category === "PTY")?.fcstValue === "0") {
		result = `sky_${items.find((item) => item.category === "SKY")?.fcstValue}`;
	} else {
		result = `pty_${items.find((item) => item.category === "PTY")?.fcstValue}`;
	}
	console.log("sky code", result);

	return <li>{skyCodeToTxt(result)} |</li>;
};

const minMaxTemp = (data: UltraSrtFcstItem[]) => {
	const today = data.filter((el) => el.fcstDate === "20250620");
	const TMX = today.filter((el) => el.category === "TMX").find((item) => item.fcstValue);
	console.log("today!!!!", today, TMX);
};

const TodayWeather = ({ location }: { location: ILocation }) => {
	/**
	 * 대기(미세먼지,초미세먼지,오존) 상태 조회하기
	 * WGS84 -> TM 변환
	 * tm 좌표를 이용하여 현위치에서 가까운 측정소 조회하기
	 * 가까운 측정소기준의 대기(미먼,초미먼) 상태 조회하기
	 */
	// WGS84 -> TM 변환
	const { x, y } = convertWGS84ToTM(location.latitude, location.longitude);
	console.log("TM 좌표", { x, y });
	// tm 좌표를 이용하여 현위치에서 가까운 측정소 조회하기
	const { data: AirInfoStationData } = useGetAirInfoStation(x, y);
	//가까운 측정소기준의 대기(미먼,초미먼) 상태 조회하기
	const { data: airInfoData } = useGetAirInfoByStation(AirInfoStationData?.response.body.items[0].stationName);
	console.log("airInfoData", airInfoData?.items);

	/**
	 * 날씨 단기 실황 조회
	 * WGS84 > 격자 좌표계 변환
	 * base date, time 계산하기
	 * 변환된 좌표를 이용하여 초단기실황, 초단기예보, 단기예보 날씨 정보 조회
	 */
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
	const vilage_base_time = String(vilageBaseTime(hour)).padStart(2, "0") + "00";
	console.log("vilage_base_time 계산", vilage_base_time);

	// 어제 온도와 비교를 위해 어제 + 1시간 후(제공 데이터가 최대 23시간임) base date, time 계산하기
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	const y_base_date = yesterday.toISOString().slice(0, 10).replace(/-/g, "");
	const y_base_time_10 = String(hour + 2).padStart(2, "0") + "00";

	// 변환된 좌표를 이용하여 초단기실황, 초단기예보, 단기예보 날씨 정보 조회
	const { data: ultraSrtNcstData } = useGetUltraSrtNcst({ nx, ny, base_date, base_time: base_time_10 });
	const { data: yesterdayUltraSrtNcstData } = useGetUltraSrtNcst({ nx, ny, base_date: y_base_date, base_time: y_base_time_10 });
	const { data: ultraSrtData } = useGetUltraSrtFcst({ nx, ny, base_date, base_time });

	// TODO : 0~1시일 경우 base_date 하루 전으로 예외처리 필요
	const { data: vilageFcstData } = useGetVilageFcst({ nx, ny, base_date, base_time: vilage_base_time });
	console.log("ultraSrtData", ultraSrtData, "ultraSrtNcstData : ", ultraSrtNcstData, "vilageFcstData : ", vilageFcstData);
	console.log("yesterday", y_base_date, y_base_time_10, yesterdayUltraSrtNcstData);

	// TODO 중기기상예보 불러오기
	// 중기 예보는 https://openweathermap.org/api 에서 불러와야 하나.. 고민 - 지역 코드 매핑..
	// const { data: midLandFcstData } = useGetMidLandFcst({ regId: "11B00000", tmFc: "202506130600" });
	const { data: openWeatherForecastData } = useGetOpenWeatherForecast(location);
	// const { data: openWeatherCurrentData } = useGetOpenWeatherCurrent(location);
	console.log("!!!!!!!!! openWeatherForecastData", openWeatherForecastData);

	return (
		<TodayWeatherWr>
			<Grid container padding={"10px 20px"}>
				<TodayBx size={8}>
					<div className="sky_icon">
						{ultraSrtData !== undefined && <SkyIconBx ultraSrtData={ultraSrtData} />}
						<b>
							{ultraSrtNcstData && getValueByCategory(ultraSrtNcstData, "T1H")}
							<small>℃</small>
						</b>
					</div>

					<ul>
						{ultraSrtData !== undefined && renderSkyTxt(ultraSrtData)}
						{yesterdayUltraSrtNcstData && ultraSrtNcstData && renderTempDiff(ultraSrtNcstData, yesterdayUltraSrtNcstData)}
					</ul>
					<ul>
						<li>{vilageFcstData && minMaxTemp(vilageFcstData.body.items.item)}</li>
						{/* TODO : 최저, 최고 기온을 제공하지 않음, 예보에서 온도 불러와 배열 만들어서 표기하기 */}
						<li>최저 ˚</li>
						<li>최고 ˚</li>
					</ul>
				</TodayBx>
				<Grid size={4}>tomorrowWeather</Grid>
			</Grid>
			{airInfoData && ultraSrtNcstData && openWeatherForecastData && <TodayWeatherDetailSlider airInfoData={airInfoData} ultraSrtNcstData={ultraSrtNcstData} openWeatherForecastData={openWeatherForecastData} />}
			{vilageFcstData && <VilageWeatherSlider vilageFcstData={vilageFcstData} />}
			{/* {midLandFcstData && <DailyForecast midLandFcstData={midLandFcstData} />} */}
		</TodayWeatherWr>
	);
};

export default TodayWeather;
