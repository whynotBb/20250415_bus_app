import { useQuery } from "@tanstack/react-query";
import { getStationsByPosList } from "../apis/busStopApi";

const useGetStationsByPosList = (location: { latitude: number; longitude: number }) => {
  return useQuery({
    queryKey: ["stations-by-pos"],
    queryFn: () => {
      return getStationsByPosList(location);
    },
  });
};

export default useGetStationsByPosList;
