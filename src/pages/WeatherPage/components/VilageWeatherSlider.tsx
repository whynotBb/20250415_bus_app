import { UltraSrtFcstItem, UltraSrtFcstRes } from "../../../models/weather";

import { Swiper } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";
import { Paper, styled } from "@mui/material";

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
	// console.log("here", groupForecastsByDateAndTimeArr);
	groupForecastsByDateAndTimeArr.map((item, idx) => {
		console.log("1dep", item.times[0].fcstTime, idx);
	});

	return (
		<div>
			<Swiper spaceBetween={10} slidesPerView={"auto"} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
				{/* {groupForecastsByDateAndTimeArr.map((item) => item.times.map())} */}
				<Item />
			</Swiper>
		</div>
	);
};

export default VilageWeatherSlider;
