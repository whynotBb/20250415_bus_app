import { styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import useGetStationByUidItem from "../../../../hooks/useGetStationByUidItem";
import { useEffect, useState } from "react";
import Loading from "../../../../common/components/Loading"; // Import Swiper styles
import "../../../../../node_modules/swiper/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

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
  // display: "flex",
  // flexWrap: "wrap",
  // gap: "6px",
  marginTop: "10px",
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
const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
  const arsId = stationInfo?.arsId ?? 0;
  const { data } = useGetStationByUidItem(arsId);

  const busInfo = data?.ServiceResult?.msgBody;

  useEffect(() => {
    if (!stationInfo) return;

    console.log("bus stop detail : ", busInfo);
  }, [stationInfo, busInfo]);

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
          {busInfo && busInfo.itemList.length > 0 ? (
            busInfo.itemList.map((item) => (
              <SwiperSlide className="item" key={item.busRouteId}>
                <div>
                  <BusName className={item.stationTp === 0 ? "green" : item.stationTp === 1 ? "green" : "red"}>
                    {item.rtNm}
                  </BusName>
                  <p>{item.arrmsg1}</p>
                  <p>{item.arrmsg2}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <Loading />
          )}
        </Swiper>
      </DetailList>
    </BottomSheet>
  );
};

export default BusStopDetail;
