import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../models/map";
import { getStationByCurrent } from "../apis/busStopApi";

const useGetStationByCurrent = ({ location }: { location: ILocation }) => {
	return useQuery({
		queryKey: ["stations-by-current"],
		queryFn: () => {
			return getStationByCurrent(location);
		},
	});
};

export default useGetStationByCurrent;
