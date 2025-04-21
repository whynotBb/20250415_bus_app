import { colors, styled, Typography } from "@mui/material";
import { StationItem } from "../../../../models/map";
import Loading from "../../../../common/components/Loading";
import useGetStationByUidItem from "../../../../hooks/useGetStationByUidItem";
import { use, useEffect, useState } from "react";
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

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  b: {
    color: theme.palette.primary.main,
    fontSize: "18px",
  },
}));

const BusStopDetail = ({ isOpen, stationInfo }: BusStopDetailProps) => {
  const arsId = stationInfo?.arsId ?? 0;
  const { data } = useGetStationByUidItem(arsId);
  const busInfo = data?.ServiceResult.msgBody.itemList;
  console.log("bus stop detail : ", busInfo);
  return (
    <BottomSheet style={{ bottom: isOpen ? "0" : "-200px" }}>
      <Title>
        <Typography variant="h2">
          <b>{stationInfo?.stationNm}</b> <small>{stationInfo?.dist}m</small>
        </Typography>
        <Typography>
          ({stationInfo?.arsId} / ID : {stationInfo?.stationId} )
        </Typography>
      </Title>
    </BottomSheet>
  );
};

export default BusStopDetail;
