import { styled } from "@mui/material";
import { UltraSrtFcstRes } from "../../models/weather";

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
	"&.pty_1": {
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
 *
 * sky case
 * 1. sky : 맑음(1), 구름많음(3), 흐림(4)
 * 2. 강수 PTY : 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
 */
const SkyIconBx = ({ ultraSrtData }: { ultraSrtData: UltraSrtFcstRes }) => {
	console.log("sky icon -", ultraSrtData);

	return ultraSrtData.body.items.item.find((item) => item.category === "PTY")?.fcstValue === "0" ? <SkyIcon className={`sky sky_${ultraSrtData !== undefined && ultraSrtData.header.resultCode === "00" && ultraSrtData.body.items.item?.find((item) => item.category === "SKY")?.fcstValue}`} /> : <SkyIcon className={`pty pty_${ultraSrtData !== undefined && ultraSrtData.header.resultCode === "00" && ultraSrtData.body.items.item?.find((item) => item.category === "PTY")?.fcstValue}`} />;
};

export default SkyIconBx;
