import axios from "axios";

const SEOUL_BUS_STOP_KEY = import.meta.env.VITE_SEOUL_BUS_STOP_API_KEY;

export const getStationsByPosList = async (location) => {
  console.log("getSTateion", location);

  try {
    const response = await axios.get("http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos", {
      params: {
        serviceKey: SEOUL_BUS_STOP_KEY,
        tmX: location.longitude,
        tmY: location.latitude,
        radius,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch get stations by pos");
  }
};
