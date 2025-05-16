import { useQuery } from "@tanstack/react-query";
import { UltraSrtNcstReq } from "../models/weather";
import { getUltraSrtFcst } from "../apis/weatherApi";

const useGetUltraSrtFcst = (params: UltraSrtNcstReq) => {
	return useQuery({
		queryKey: ["ultra-srt-fcst", params],
		queryFn: () => getUltraSrtFcst(params),
	});
};
export default useGetUltraSrtFcst;
