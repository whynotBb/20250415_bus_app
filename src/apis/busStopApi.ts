import axios from "axios";
import { SEOUL_BUS_API_KEY } from "../configs/mapConfig";
import { GetStationsByPosResponse, ILocation } from "../models/map";
import { XMLParser } from "fast-xml-parser";

export const getStationsByPos = async (location: ILocation, radius: number): Promise<GetStationsByPosResponse> => {
  console.log("getStateion", location, radius);

  try {
    const response = await axios.get(`/api/api/rest/stationinfo/getStationByPos`, {
      params: {
        serviceKey: SEOUL_BUS_API_KEY,
        tmX: location.longitude,
        tmY: location.latitude,
        radius,
      },
      responseType: "text", //응답을 문자열로 받기
    });

    //json 으로 파싱
    const parser = new XMLParser();
    const json = parser.parse(response.data);
    return json;
  } catch (error) {
    throw new Error(`fail to fetch get stations by pos : ${error}`);
  }
};

export const getStationByUidItem = async (arsId: number) => {
  try {
    const response = await axios.get("/api/api/rest/stationinfo/getStationByUid", {
      params: {
        serviceKey: SEOUL_BUS_API_KEY,
        arsId: arsId,
      },
    });
    //json 으로 파싱
    const parser = new XMLParser();
    const json = parser.parse(response.data);
    return json;
  } catch (error) {
    throw new Error(`fail to fetch get station by id : ${error}`);
  }
};
