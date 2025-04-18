import { styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import Loading from "../../../../common/components/Loading";
interface BusStopDetailProps {
	isOpen: boolean;
	stationInfo: StationItem | null;
}
const BottomSheet = styled("div")(({ theme }) => ({
	width: "100%",
	height: "200px",
	position: "fixed",
	bottom: "-200px",
	left: "50%",
	transform: "translateX(-50%)",
	backgroundColor: theme.palette.background.default,
	borderRadius: "30px 30px 0 0",
	boxShadow: "0px -4px 10px 2px rgba(0, 0, 0, .3)",
	padding: "20px",
	transition: "all .3s",
}));

const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
	console.log("why", isOpen);
	if (!isOpen) {
		console.log("없어, 닫아");
	} else {
		console.log("있어, 열어");
	}

	return (
		<BottomSheet style={{ bottom: isOpen ? "0" : "-200px" }}>
			<Typography variant="h2">
				{stationInfo?.stationNm} <small>{stationInfo?.dist}m</small>
			</Typography>
			<Typography>ID : {stationInfo?.stationId}</Typography>
		</BottomSheet>
	);
};

export default BusStopDetail;
