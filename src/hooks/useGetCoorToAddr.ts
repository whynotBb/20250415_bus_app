import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../models/map";
import { getCoordToAddr } from "../apis/weatherApi";

/**
 * x, y 좌표 주소로 변환 api(kakao)
 * @param location
 * @returns
 */
const useGetCoordToAddr = (location: ILocation | undefined) => {
	console.log("useGetCoordToAddr : location", location);

	return useQuery({
		queryKey: ["coord-to-addr", location],
		queryFn: () => getCoordToAddr(location!),
		enabled: !!location,
	});
};

export default useGetCoordToAddr;
