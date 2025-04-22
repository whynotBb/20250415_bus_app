import { styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import useGetStationByUidItem from "../../../../hooks/useGetStationByUidItem";
import { useEffect, useState } from "react";
import Loading from "../../../../common/components/Loading"; // Import Swiper styles
import "../../../../../node_modules/swiper/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SyncIcon from "@mui/icons-material/Sync";

interface BusStopDetailProps {
	isOpen: boolean;
	stationInfo: StationItem | null;
}
const BottomSheet = styled("div")(({ theme }) => ({
	width: "100%",
	height: "260px",
	position: "fixed",
	bottom: "-260px",
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
	flexWrap: "wrap",
	gap: "5px",
	alignItems: "center",
	b: {
		color: theme.palette.primary.main,
		fontSize: "18px",
	},
}));
const DetailList = styled("div")({
	margin: "20px 0",
	".item ": {
		width: "calc(50% - 3px)",
		textAlign: "center",
	},
});
const BusName = styled("b")({
	display: "inline-block",
	padding: "0 10px",
	borderRadius: "100px",
	fontSize: "16px",
	marginBottom: "6px",
	height: "26px",
	lineHeight: "26px",
	background: "royalblue",
});
const UpdateTime = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: "6px",
});
const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
	const arsId = stationInfo?.arsId ?? 0;
	// refetch > react-query 에서 제공하는 기능
	const { data, refetch, isLoading } = useGetStationByUidItem(arsId);
	const busInfo = data?.ServiceResult?.msgBody;
	//update time

	const [lastUpdated, setLastUpdated] = useState<string>("");

	//3초에 한번씩 버스 정보 업데이트
	useEffect(() => {
		if (!arsId) return;

		// 현재 시간 표기, 데이터 refetch 할때 마다 업데이트
		const update = () => {
			refetch();
			const now = dayjs().format("HH:mm:ss");
			setLastUpdated(now);
		};

		update(); // 컴포넌트 처음 마운트될 때도 호출
		const interval = setInterval(update, 15000);

		return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
	}, [arsId, refetch]);

	useEffect(() => {
		if (!stationInfo) return;

		console.log("bus stop detail : ", busInfo);
	}, [stationInfo, busInfo]);

	if (isLoading) return <Loading />;
	return (
		<BottomSheet style={{ bottom: isOpen ? "0" : "-260px" }}>
			<Title>
				<Typography variant="h2">
					<b>{stationInfo?.stationNm}</b> <small>{stationInfo?.dist}m</small>
				</Typography>
				<Typography>
					({stationInfo?.arsId} / ID : {stationInfo?.stationId})
				</Typography>
			</Title>
			<DetailList>
				<Swiper
					slidesPerView={2}
					spaceBetween={6}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
				>
					{/* // list item 이 1개이면 obj로 들어옴, 수정해야함 */}
					{busInfo ? (
						busInfo.itemList.map((item) => (
							<SwiperSlide className="item" key={item.busRouteId}>
								<div>
									<BusName className={item.stationTp === 0 || item.stationTp === 1 ? "green" : "red"}>{item.rtNm}</BusName>
									<p>{item.arrmsgSec1}</p>
									<p>{item.arrmsgSec2}</p>
								</div>
							</SwiperSlide>
						))
					) : (
						<Loading />
					)}
				</Swiper>
			</DetailList>
			<UpdateTime>
				<AccessTimeIcon />
				<p>{lastUpdated}</p>
				<p>
					<SyncIcon />
				</p>
			</UpdateTime>
		</BottomSheet>
	);
};

export default BusStopDetail;
