import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../models/map";
import { getCoordToAddr } from "../apis/weatherApi";

/**
 * x, y 좌표 주소로 변환 api
 * @param location
 * @returns
 */
const useGetCoordToAddr = (location: ILocation | null) => {
	return useQuery({
		queryKey: ["coord-to-addr", location],
		queryFn: () => getCoordToAddr(location!),
		enabled: !!location,
	});
};

export default useGetCoordToAddr;
