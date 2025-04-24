import { keyframes, styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import useGetStationByUidItem from "../../../../hooks/useGetStationByUidItem";
import { useEffect, useState } from "react";
import Loading from "../../../../common/components/Loading"; // Import Swiper styles
import "../../../../../node_modules/swiper/swiper.css";
import "../../../../../node_modules/swiper/modules/navigation.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import dayjs from "dayjs";
import { normalizeItemList } from "../../../../utils/data/normalizeItemList";

interface BusStopDetailProps {
	isOpen: boolean;
	stationInfo: StationItem | null;
}
const BottomSheet = styled("div")(({ theme }) => ({
	width: "100%",
	height: "300px",
	position: "fixed",
	bottom: "-300px",
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
const DetailList = styled("div")(({ theme }) => ({
	margin: "14px 0 10px",
	".item ": {
		width: "calc(50% - 3px)",
		textAlign: "center",
	},
	small: {
		display: "block",
		fontWeight: "400",
		marginBottom: "4px",
	},
	".swiper-button-prev:after,.swiper-button-next:after": {
		fontSize: "20px",
		color: theme.palette.primary.main,
	},
}));
const BusName = styled("b")({
	display: "inline-block",
	padding: "0 10px",
	borderRadius: "100px",
	fontSize: "16px",
	marginBottom: "6px",
	height: "26px",
	lineHeight: "27px",
	background: "gray",
	color: "#fff",
	"&.skyBlue": {
		backgroundColor: "#007ACC", // Deep Sky Blue
	},
	"&.green": {
		backgroundColor: "#219653", // Deep Emerald Green
	},
	"&.blue": {
		backgroundColor: "#2F80ED", // Vivid Royal Blue
	},
	"&.yellow": {
		backgroundColor: "#E2B93B", // Rich Golden Yellow (어두운 편에 속하는 노란색)
	},
	"&.red": {
		backgroundColor: "#C0392B", // Dark Red
	},
});
const UpdateTime = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: "6px",
});

const Timer = styled("div")({
	width: "30px",
	height: "30px",
	lineHeight: "31px",
	textAlign: "center",
	borderRadius: "50%",
	position: "relative",
});
// 회전 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const RotatingCircle = styled("span")(({ theme }) => ({
	content: '""',
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	border: `2px dashed ${theme.palette.primary.main}`,
	borderRadius: "50%",
	borderTopColor: "transparent",
	borderRightColor: "transparent",
	animation: `${spin} 2s linear infinite`,
	pointerEvents: "none",
}));

const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
	const arsId = stationInfo?.arsId ?? 0;
	// refetch > react-query 에서 제공하는 기능
	const { data, refetch, isLoading } = useGetStationByUidItem(arsId);
	const busInfo = data?.ServiceResult?.msgBody;
	//update time

	const [lastUpdated, setLastUpdated] = useState<string>("");
	const [countDown, setCountDown] = useState<number>(15);

	//3초에 한번씩 버스 정보 업데이트
	useEffect(() => {
		if (!arsId) return;

		// 현재 시간 표기, 데이터 refetch 할때 마다 업데이트
		const update = () => {
			refetch();
			const now = dayjs().format("YY.MM.DD ddd HH:mm:ss");
			setLastUpdated(now);
			setCountDown(15);
		};

		update(); // 컴포넌트 처음 마운트될 때도 호출
		const interval = setInterval(update, 15000);

		return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
	}, [arsId, refetch]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountDown((prev) => (prev > 1 ? prev - 1 : 15));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (!stationInfo) return;

		console.log("bus stop detail : ", busInfo);

		if (!busInfo) {
			console.log("! busInfo");
		} else if (busInfo === undefined) {
			console.log("bus info undefined");
		}
	}, [stationInfo, busInfo]);
	const itemList = normalizeItemList(busInfo?.itemList).sort((a, b) => {
		const getSortValue = (item) => {
			if (!item.traTime1 || item.arrmsg1 === "운행종료") {
				return Infinity;
			}
			return item.traTime1;
		};

		return getSortValue(a) - getSortValue(b);
	});
	if (isLoading) return <Loading />;
	return (
		<>
			<BottomSheet style={{ bottom: isOpen ? "0" : "-300px" }}>
				<Title>
					<Typography variant="h2">
						<b>{stationInfo?.stationNm}</b> <small>{stationInfo?.dist}m</small>
					</Typography>
					<Typography>
						({stationInfo?.arsId} / ID : {stationInfo?.stationId})
					</Typography>
				</Title>
				<DetailList>
					<Swiper navigation={true} modules={[Navigation]} slidesPerView={2} spaceBetween={6} className="mySwiper">
						{/* // list item 이 1개이면 obj로 들어옴, 수정해야함 */}
						{itemList.length > 0 ? (
							itemList.map((item, idx) => (
								<SwiperSlide className="item" key={idx}>
									<div>
										<BusName className={item.routeType === 1 ? "skyBlue" : item.routeType === 2 || item.routeType === 4 ? "green" : item.routeType === 3 ? "blue" : item.routeType === 5 ? "yellow" : item.routeType === 6 ? "red" : "gray"}>{item.rtNm}</BusName>
										<small>다음 : {item.nxtStn}</small>
										<small>({item.adirection} 방면)</small>
										<p>
											{item.arrmsg1} {item.isFullFlag1 === 1 && "(만차)"}
										</p>
										<p>
											{item.arrmsg2} {item.isFullFlag1 === 1 && "(만차)"}
										</p>
									</div>
								</SwiperSlide>
							))
						) : (
							<Loading />
						)}
					</Swiper>
				</DetailList>
				<UpdateTime>
					<p>{lastUpdated}</p>

					<Timer>
						<RotatingCircle />
						{countDown}
					</Timer>
				</UpdateTime>
			</BottomSheet>
		</>
	);
};

export default BusStopDetail;
