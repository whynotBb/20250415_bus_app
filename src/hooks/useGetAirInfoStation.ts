import { useQuery } from "@tanstack/react-query";
import { getAirInfoStation } from "../apis/weatherApi";

/**
 * 현위치에서 가까운 측정소 찾기
 * @param x
 * @param y
 * @returns
 */
const useGetAirInfoStation = (x: number, y: number) => {
	return useQuery({
		queryKey: ["air-info-station", x, y],
		queryFn: () => {
			return getAirInfoStation(x, y);
		},
	});
};
export default useGetAirInfoStation;
