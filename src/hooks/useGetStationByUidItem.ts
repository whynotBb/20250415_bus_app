import { useQuery } from "@tanstack/react-query";
import { getStationByUidItem } from "../apis/busStopApi";

/**
 * 버스정류장 정보(정류장정보, 도착버스 정보)
 * @param arsId
 * @returns
 */
const useGetStationByUidItem = (arsId: number) => {
	return useQuery({
		queryKey: ["station-by-id", arsId],
		queryFn: () => {
			return getStationByUidItem(arsId);
		},
	});
};
export default useGetStationByUidItem;
