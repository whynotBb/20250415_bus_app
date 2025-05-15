import { useQuery } from "@tanstack/react-query";
import { getAirInfoStation } from "../apis/weatherApi";

const useGetAirInfoStation = (x: number, y: number) => {
	return useQuery({
		queryKey: ["air-info-station", x, y],
		queryFn: () => {
			return getAirInfoStation(x, y);
		},
	});
};
export default useGetAirInfoStation;
