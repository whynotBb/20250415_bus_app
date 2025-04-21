import { useQuery } from "@tanstack/react-query";
import { getStationByUidItem } from "../apis/busStopApi";

const useGetStationByUidItem = (arsId: number) => {
  return useQuery({
    queryKey: ["station-by-id", arsId],
    queryFn: () => {
      return getStationByUidItem(arsId);
    },
  });
};
export default useGetStationByUidItem;
