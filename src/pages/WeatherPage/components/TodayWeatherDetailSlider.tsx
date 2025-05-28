import { Paper, styled } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";

import AtmosphereBx from "../../../common/components/AtmosphereBx";
import { airInfoGradeToTxt } from "../../../utils/airInfoGradeToTxt";
import { vecToTxt } from "../../../utils/weatherConvert";
import { AirInfoDataResponse } from "../../../models/airInfo";
import { UltraSrtNcstRes } from "../../../models/weather";

interface TodayWeatherDetailParams {
	airInfoData: AirInfoDataResponse;
	ultraSrtNcstData: UltraSrtNcstRes;
}

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
const TodayWeatherDetailSlider = ({ airInfoData, ultraSrtNcstData }: TodayWeatherDetailParams) => {
	return (
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
							<span>일출</span>@@:@@
						</p>
						<p>
							<span>일몰</span>@@:@@
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
	);
};

export default TodayWeatherDetailSlider;
