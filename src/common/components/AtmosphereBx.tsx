import { styled } from "@mui/material";
import { AirInfoDataResponse } from "../../models/airInfo";
import { airInfoGradeToTxt } from "../../utils/airInfoGradeToTxt";

const Atmosphere = styled("div")({
	display: "flex",
	// flexDirection: "column",
	gap: "10px",
	fontSize: "12px",
});
const AirGradeBar = styled("span")({
	display: "flex",
	alignItems: "center",
	gap: "2px",
	fontSize: "13px",
	height: "20px",
	justifyContent: "center",
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
/**
 * 미세먼지, 초미세먼지 grade > txt 변환 하여 보여주는 comp
 */
const AtmosphereBx = ({ airInfo }: { airInfo: AirInfoDataResponse }) => {
	return (
		<Atmosphere className="atmosphere_bx">
			<div>
				<p>미세</p>
				<AirGradeBar className={`airGrade_${airInfo?.items ? airInfo.items[0].pm10Grade : 0}`}>{airInfoGradeToTxt(airInfo?.items ? airInfo.items[0].pm10Grade : "0")}</AirGradeBar>
			</div>
			<div>
				<p>초미세</p>
				<AirGradeBar className={`airGrade_${airInfo?.items ? airInfo.items[0].pm25Grade : 0}`}>{airInfoGradeToTxt(airInfo?.items && airInfo.items[0].pm25Grade ? airInfo.items[0].pm25Grade : "0")}</AirGradeBar>
			</div>
		</Atmosphere>
	);
};

export default AtmosphereBx;
