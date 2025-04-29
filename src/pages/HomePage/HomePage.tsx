import React, { useState } from "react";
import HomeToggleButton from "./components/HomeToggleButton";
import { Alignment } from "../../models/home";
import HomeMapPage from "./HomeMapPage";
import HomeTextPage from "./HomeTextPage";
import BusDetail from "./components/Map/BusDetail";
import { StationByUidItem } from "../../models/map";
import { styled } from "@mui/material";
const HomeWr = styled("div")({
  position: "relative",
});

const HomePage = () => {
  // 지도 | text 보기 토글
  const [alignment, setAlignment] = useState<Alignment>("map");
  // 버스 정보 bus detail 여닫기, busDetailInfo 업데이트
  const [isBusDetailOpen, setIsBusDetailOpen] = useState<boolean>(false);
  const [busDetailInfo, setBusDetailInfo] = useState<StationByUidItem | null>(null);
  // 지도 | text 보기 토글
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: Alignment | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    //bus detail 열려 있으면 닫아준다.
    setIsBusDetailOpen(false);
  };

  // 버스 정보 bus detail 여닫기 함수
  const openBusDetail = (busDetailInfo: StationByUidItem) => {
    console.log("openBusDetail", busDetailInfo);
    setIsBusDetailOpen(true);
    setBusDetailInfo(busDetailInfo);
  };
  return (
    <HomeWr>
      <HomeToggleButton alignment={alignment} handleChange={handleChange} />
      {alignment === "map" ? <HomeMapPage openBusDetail={openBusDetail} /> : <HomeTextPage />}
      {isBusDetailOpen && busDetailInfo !== null && <BusDetail busDetailInfo={busDetailInfo} />}
    </HomeWr>
  );
};

export default HomePage;
