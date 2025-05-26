import { Box, Grid, Paper, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";
import { ILocation } from "../../../models/map";
import useGetAirInfoStation from "../../../hooks/useGetAirInfoStation";
import { convertWGS84ToTM } from "../../../utils/convertWGS84ToTM";
import useGetAirInfoByStation from "../../../hooks/useGetAirInfoByStation";
import AtmosphereBx from "../../../common/components/AtmosphereBx";
import { airInfoGradeToTxt } from "../../../utils/airInfoGradeToTxt";
import { convertWGS84ToNxy } from "../../../utils/convertWGS84ToNxy";
import useGetUltraSrtNcst from "../../../hooks/useGetUltraSrtNcst";
import useGetUltraSrtFcst from "../../../hooks/useGetUltraSrtFcst";
import { vecToTxt } from "../../../utils/weatherConvert";
import SkyIconBx from "../../../common/components/SkyIconBx";

const TodayWeatherWr = styled(Box)({});
const TodayBx = styled(Grid)({
	".sky_icon": {
		width: "100px",
		height: "100px",
		position: "relative",
		textAlign: "center",
		paddingTop: "45px",
		".sky": {
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
const WeatherDetailSlider = styled("div")({
	".swiper": {
		padding: "0 20px",
	},
	".swiper-slide": {
		width: "auto",
	},
});
const Item = styled(Paper)({
	// border: "1px solid #fff",
	padding: "10px 14px",
	boxShadow: "none",
	fontSize: "15px",
	height: "65px",
	boxSizing: "border-box",
	small: {
		fontWeight: "400",
	},
	".atmosphere_bx": {
		p: {
			fontSize: "15px",
		},
		flexDirection: "column",
		gap: "0",
		div: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "5px",
		},
	},
	".atmosphere_bx div": {},
});
const O3GradeTxt = styled("span")({
	display: "inline-flex",
	alignItems: "center",
	gap: "2px",
	fontSize: "13px",
	marginLeft: "6px",
	"&:before": {
		content: '""',
		width: "8px",
		height: "8px",
		background: "#ddd",
		borderRadius: "50%",
	},
	"&.airGrade_1": {
		color: "#64A8FF",
		"&:before": {
			background: "#64A8FF",
		},
	},
	"&.airGrade_2": {
		color: "#6ED6A0",
		"&:before": {
			background: "#6ED6A0",
		},
	},
	"&.airGrade_3": {
		color: "#FFD966",
		"&:before": {
			background: "#FFD966",
		},
	},
	"&.airGrade_4": {
		color: "#FF6B6B",
		"&:before": {
			background: "#FF6B6B",
		},
	},
});
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
	 * 변환된 좌표를 이용하여 초단기예보 날씨 정보 조회
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

	// 변환된 좌표를 이용하여 초단기예보 날씨 정보 조회
	const { data: ultraSrtNcstData } = useGetUltraSrtNcst({ nx, ny, base_date, base_time: base_time_10 });
	const { data: ultraSrtData } = useGetUltraSrtFcst({ nx, ny, base_date, base_time });
	console.log("ultraSrtData", ultraSrtData, "ultraSrtNcstData : ", ultraSrtNcstData);
	return (
		<TodayWeatherWr>
			<Grid container padding={"10px 20px"}>
				<TodayBx size={8}>
					<div className="sky_icon">
						{ultraSrtData !== undefined && <SkyIconBx ultraSrtData={ultraSrtData} />}
						<b>
							{ultraSrtNcstData !== undefined && ultraSrtNcstData.body.items.item.find((item) => item.category === "T1H")?.obsrValue}
							<small>℃</small>
						</b>
					</div>

					<ul>
						{ultraSrtData !== undefined && <li>{ultraSrtData.body.items.item.find((item) => item.category === "PTY")?.fcstValue === "0" ? ultraSrtData.body.items.item.find((item) => item.category === "SKY")?.fcstValue : ultraSrtData !== undefined && ultraSrtData.body.items.item.find((item) => item.category === "PTY")?.fcstValue}</li>}
						<li>어제보다 1.7˚ ↓↑</li>
					</ul>
					<ul>
						<li>최저 13˚</li>
						<li>최고 26˚</li>
					</ul>
				</TodayBx>
				<Grid size={4}>tomorrowWeather</Grid>
			</Grid>
			<WeatherDetailSlider>
				<Swiper spaceBetween={10} slidesPerView={"auto"} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
					<SwiperSlide>
						<Item>{airInfoData && <AtmosphereBx airInfo={airInfoData} />}</Item>
					</SwiperSlide>

					<SwiperSlide>
						<Item>
							<span>습도</span>
							<p>
								<b>{`${ultraSrtNcstData !== undefined && ultraSrtNcstData.body.items.item?.find((Item) => Item.category === "REH")?.obsrValue}`}</b>
								<small>%</small>
							</p>
						</Item>
					</SwiperSlide>
					<SwiperSlide>
						<Item>
							<span>{ultraSrtNcstData !== undefined && vecToTxt(ultraSrtNcstData.body.items.item?.find((item) => item.category === "VEC")?.obsrValue)}</span>
							<p>
								<b>{ultraSrtNcstData !== undefined && ultraSrtNcstData.body.items.item?.find((item) => item.category === "WSD")?.obsrValue}</b>
								<small>m/s</small>
							</p>
						</Item>
					</SwiperSlide>
					<SwiperSlide>
						<Item>
							<p>
								<span>일출</span>05:17
							</p>
							<p>
								<span>일몰</span>19:17
							</p>
						</Item>
					</SwiperSlide>
					<SwiperSlide>
						<Item>
							<span>오존지수</span>
							{airInfoData && (
								<p>
									<b>
										{airInfoData?.items ? airInfoData?.items[0].o3Value : ""}
										<small>ppm</small>
									</b>
									<O3GradeTxt className={`airGrade_${airInfoData?.items ? airInfoData?.items[0].o3Grade : ""}`}>{airInfoGradeToTxt(airInfoData?.items ? airInfoData?.items[0].o3Grade : "")}</O3GradeTxt>
								</p>
							)}
						</Item>
					</SwiperSlide>
				</Swiper>
			</WeatherDetailSlider>
		</TodayWeatherWr>
	);
};

export default TodayWeather;
