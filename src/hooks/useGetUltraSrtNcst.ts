import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../models/map";
import { getUltraSrtNcst } from "../apis/weatherApi";

const useGetUltraSrtNcst = (location: ILocation) => {
	return useQuery({
		queryKey: ["ultra-srt-ncst", location],
		queryFn: () => getUltraSrtNcst(location),
	});
};
export default useGetUltraSrtNcst;
