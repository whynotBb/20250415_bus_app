import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../models/map";
import { getStationsByPos } from "../apis/busStopApi";

const useGetStationsByPos = ({ location, radius }: { location: ILocation; radius: number }) => {
	return useQuery({
		queryKey: ["stations-by-pos"],
		queryFn: () => {
			return getStationsByPos(location, radius);
		},
	});
};

export default useGetStationsByPos;
