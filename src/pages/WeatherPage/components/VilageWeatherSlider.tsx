import { UltraSrtFcstItem, UltraSrtFcstRes } from "../../../models/weather";

import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";
import { Paper, styled } from "@mui/material";
import { getValueByCategorySm, vecToTxt } from "../../../utils/weatherConvert";

const VilageWeatherSliderWr = styled("div")({
	display: "flex",
	".swiper": {
		padding: "0 20px",
	},
	".swiper-slide": {
		width: "auto",
	},
});
const Item = styled(Paper)({
	padding: "10px 14px",
	boxShadow: "none",
	fontSize: "13px",
	height: "auto",
	boxSizing: "border-box",
	textAlign: "center",
	lineHeight: "20px",
	flexDirection: "column",
	gap: "2px",
	display: "flex",
	small: {
		fontWeight: "300",
		color: "#f2f2f2",
		fontSize: "10px",
		marginLeft: "2px",
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

const WeatherDesc = styled("ul")({
	flexShrink: "0",
	fontSize: "13px",
	lineHeight: "20px",
	padding: "10px 10px 32px 20px",
	textAlign: "center",
	flexDirection: "column",
	gap: "2px",
	display: "flex",
	".date": {
		lineHeight: "22px",
		background: "#1c549e",
		padding: "0 6px",
		borderRadius: "100px",
		textAlign: "center",
		color: "#fff",
		marginBottom: "auto",
		fontSize: "12px",
	},
});

// sky case
// 1. sky : 맑음(1), 구름많음(3), 흐림(4)
// 2. 강수 PTY : 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)z
const SkyIcon = styled("div")({
	width: "40px",
	height: "40px",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	backgroundSize: "100%",
	// backgroundImage: "url(/assets/weather_sunny.svg)",

	"&.sky_1": {
		backgroundImage: "url(/assets/weather_sunny.svg)",
	},
	"&.sky_3": {
		backgroundImage: "url(/assets/weather_cloudy.svg)",
	},
	"&.sky_4": {
		backgroundImage: "url(/assets/weather_cloudy_2.svg)",
	},
	"&.pty_1,&.pty2": {
		backgroundImage: "url(/assets/weather_rain.svg)",
	},
	"&.pty_2": {
		backgroundImage: "url(/assets/weather_rain.svg)",
	},
	"&.pty_3": {
		backgroundImage: "url(/assets/weather_snow.svg)",
	},
});

/**
 * 예보 날짜와 시간에 따라 배열로 묶어 반환
 * @param arr
 */
function groupForecastsByDateAndTime(data: UltraSrtFcstItem[]) {
	const groupedByDate: Record<string, UltraSrtFcstItem[]> = {};

	// 1차 그룹화: fcstDate
	data.forEach((item) => {
		if (!groupedByDate[item.fcstDate]) {
			groupedByDate[item.fcstDate] = [];
		}
		groupedByDate[item.fcstDate].push(item);
	});

	const result = Object.entries(groupedByDate).map(([fcstDate, forecastsForDate]) => {
		const groupedByTime: Record<string, UltraSrtFcstItem[]> = {};

		// 2차 그룹화: fcstTime
		forecastsForDate.forEach((item) => {
			if (!groupedByTime[item.fcstTime]) {
				groupedByTime[item.fcstTime] = [];
			}
			groupedByTime[item.fcstTime].push(item);
		});

		const times = Object.entries(groupedByTime).map(([fcstTime, items]) => ({
			fcstTime,
			items,
		}));

		return {
			fcstDate,
			times,
		};
	});

	return result;
}

const VilageWeatherSlider = ({ vilageFcstData }: { vilageFcstData: UltraSrtFcstRes }) => {
	console.log("VilageWeatherSlider :", vilageFcstData);
	const groupForecastsByDateAndTimeArr = groupForecastsByDateAndTime(vilageFcstData.body.items.item);
	console.log("here", groupForecastsByDateAndTimeArr);
	groupForecastsByDateAndTimeArr.map((item, idx) => {
		console.log("1dep", item.times[0].fcstTime, idx);
	});

	return (
		<VilageWeatherSliderWr>
			<WeatherDesc>
				<li className="date">-</li>
				<li>
					강수확률<small>%</small>
				</li>
				<li>
					강수량<small>mm</small>
				</li>
				<li>
					습도<small>%</small>
				</li>
				<li>
					바람<small>m/s</small>
				</li>
			</WeatherDesc>
			<Swiper spaceBetween={6} slidesPerView={"auto"} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
				{/* {groupForecastsByDateAndTimeArr.map((item) => item.times.map((item2) => item2.items.map((item3) => item3.category)))} */}
				{groupForecastsByDateAndTimeArr.map((item) =>
					item.times.map((item2) => (
						<SwiperSlide>
							<Item>
								<p>
									{item2.fcstTime.slice(0, 2)}:{item2.fcstTime.slice(2, 4)}
								</p>
								{getValueByCategorySm(item2.items, "PTY") === "0" ? <SkyIcon className={`sky sky_${getValueByCategorySm(item2.items, "SKY")}`} /> : <SkyIcon className={`pty pty_${getValueByCategorySm(item2.items, "PTY")}`} />}
								<p>
									{getValueByCategorySm(item2.items, "TMP")}
									<small>°</small>
								</p>
								<p>
									{getValueByCategorySm(item2.items, "POP")}
									<small>%</small>
								</p>
								<p>
									{getValueByCategorySm(item2.items, "PCP") === "강수없음" ? "0" : getValueByCategorySm(item2.items, "PCP")}
									<small>mm</small>
								</p>
								<p>
									{getValueByCategorySm(item2.items, "REH")}
									<small>%</small>
								</p>
								<p>
									{getValueByCategorySm(item2.items, "WSD")}
									<small>m/s</small>
								</p>
								<p>{vecToTxt(getValueByCategorySm(item2.items, "VEC"))}</p>
							</Item>
						</SwiperSlide>
					))
				)}
			</Swiper>
		</VilageWeatherSliderWr>
	);
};

export default VilageWeatherSlider;
