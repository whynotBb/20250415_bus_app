import { styled, Typography } from "@mui/material";
import { StationByUidItem } from "../../../../models/map";

const BusDetailWrap = styled("div")(({ theme }) => ({
	height: "calc(100vh - 56px)",
	background: theme.palette.background.default,
	position: "absolute",
	top: "0",
	left: "0",
	width: "100%",
	padding: "20px",
	p: {
		textAlign: "center",
	},
	ul: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));
const Title = styled("div")({});

const BusDetail = ({ busDetailInfo }: { busDetailInfo: StationByUidItem }) => {
	console.log("bus detail 왔따", busDetailInfo);

	// 시간 표시 함수
	const formatTime = (time: number | undefined) => {
		if (time === undefined) {
			return "정보 미제공";
		}
		//네자리수 보장하기
		const timeStr = time.toString().padStart(4, "0");
		return `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}`;
	};
	return (
		<BusDetailWrap>
			<Title>
				<Typography variant="h2" align="center" padding="0 50px">
					{busDetailInfo.busRouteAbrv}
				</Typography>

				<p>
					첫차 {formatTime(busDetailInfo.firstTm)} | 막차 : {formatTime(busDetailInfo.lastTm)}
				</p>
				<Typography variant="h3" align="center">
					{busDetailInfo.stNm} (ID : {busDetailInfo.arsId})
				</Typography>
				<p>{busDetailInfo.sectNm}</p>
				<p>
					{busDetailInfo.adirection} 방향 | 다음역 : {busDetailInfo.nxtStn}
				</p>
				<ul>
					<li>
						{busDetailInfo.arrmsg1} {busDetailInfo.isFullFlag1 === 1 && "(만차)"}
					</li>
					<li>
						{busDetailInfo.arrmsg2} {busDetailInfo.isFullFlag1 === 1 && "(만차)"}
					</li>
				</ul>
			</Title>
		</BusDetailWrap>
	);
};

export default BusDetail;
