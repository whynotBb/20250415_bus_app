import { useQuery } from "@tanstack/react-query";
import { getUltraSrtNcst } from "../apis/weatherApi";
import { UltraSrtNcstReq } from "../models/weather";

const useGetUltraSrtNcst = (params: UltraSrtNcstReq) => {
	return useQuery({
		queryKey: ["ultra-srt-ncst", params],
		queryFn: () => getUltraSrtNcst(params),
	});
};
export default useGetUltraSrtNcst;
