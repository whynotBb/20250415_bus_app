import { useQuery } from "@tanstack/react-query";
import { getAirInfoByStation } from "../apis/weatherApi";

const useGetAirInfoByStation = (stationName: string) => {
	return useQuery({
		queryKey: ["air-info-by-station", stationName],
		queryFn: () => getAirInfoByStation(stationName),
		enabled: !!stationName, // ✅ stationName이 존재할 때만 호출
	});
};

export default useGetAirInfoByStation;
