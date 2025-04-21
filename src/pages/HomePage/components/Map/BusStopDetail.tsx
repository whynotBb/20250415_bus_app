import { styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import useGetStationByUidItem from "../../../../hooks/useGetStationByUidItem";
import { useEffect, useState } from "react";
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
	overflowY: "auto",
}));

const Title = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "5px",
	alignItems: "center",
	b: {
		color: theme.palette.primary.main,
		fontSize: "18px",
	},
}));
const DetailList = styled("ul")({});

const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
	const arsId = stationInfo?.arsId ?? 0;
	const { data } = useGetStationByUidItem(arsId);

	const busInfo = data?.ServiceResult?.msgBody;

	useEffect(() => {
		if (!stationInfo) return;

		console.log("몇번찍힐거?");
		console.log("bus stop detail : ", busInfo);
	}, [stationInfo, busInfo]);

	return (
		<BottomSheet style={{ bottom: isOpen ? "0" : "-200px" }}>
			<Title>
				<Typography variant="h2">
					<b>{stationInfo?.stationNm}</b> <small>{stationInfo?.dist}m</small>
				</Typography>
				<Typography>
					({stationInfo?.arsId} / ID : {stationInfo?.stationId})
				</Typography>
			</Title>
			<DetailList>
				{busInfo ? (
					busInfo.itemList.map((item) => (
						<li key={item.busRouteId}>
							<div>
								<p>{item.rtNm}</p>
								<span>{item.arrmsg1}</span>
								<span>{item.arrmsg2}</span>
							</div>
						</li>
					))
				) : (
					<Loading />
				)}
			</DetailList>
		</BottomSheet>
	);
};

export default BusStopDetail;
